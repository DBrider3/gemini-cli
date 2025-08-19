/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import OpenAI from 'openai';
import { Config } from '../config/config.js';
import {
  ContentGenerator,
  NomaGenerateContentParameters,
  NomaGenerateContentResponse,
  NomaCountTokensParameters,
  NomaCountTokensResponse,
  NomaEmbedContentParameters,
  NomaEmbedContentResponse,
  NomaContent
} from './contentGenerator.js';

export interface NomaClientConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
  maxTokens?: number;
}

export class NomaClient implements ContentGenerator {
  private openai: OpenAI;
  private config: NomaClientConfig;
  public userTier?: any;

  constructor(config: NomaClientConfig) {
    this.config = config;
    
    this.openai = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL || 'https://api.openai.com/v1',
    });
  }

  private convertToOpenAIMessages(contents: NomaContent[]): OpenAI.Chat.ChatCompletionMessageParam[] {
    return contents.map(content => {
      // Ensure content has the correct structure
      if (!content.role) {
        console.warn('Message missing role, defaulting to user:', content);
        content.role = 'user';
      }
      
      if (!content.parts || !Array.isArray(content.parts)) {
        console.warn('Message missing or invalid parts, creating default:', content);
        content.parts = [{ text: String(content) || '' }];
      }

      // Convert role properly - 'model' becomes 'assistant' for OpenAI
      const role = content.role === 'model' ? 'assistant' : content.role === 'system' ? 'system' : 'user';
      
      // Extract text from parts, filtering out empty strings
      const text = content.parts
        .map(part => part.text || '')
        .filter(Boolean)
        .join('\n')
        .trim();

      return {
        role,
        content: text || ''
      } as OpenAI.Chat.ChatCompletionMessageParam;
    }).filter(msg => msg.content !== ''); // Remove empty messages
  }

  private convertFromOpenAIResponse(response: OpenAI.Chat.ChatCompletion): NomaGenerateContentResponse {
    const choice = response.choices[0];
    if (!choice) {
      return { text: '' };
    }

    return {
      candidates: [{
        content: {
          role: 'model',
          parts: [{ text: choice.message.content || '' }]
        },
        finishReason: choice.finish_reason || undefined
      }],
      text: choice.message.content || ''
    };
  }

  async generateContent(
    request: NomaGenerateContentParameters,
    userPromptId: string,
  ): Promise<NomaGenerateContentResponse> {
    const messages = this.convertToOpenAIMessages(request.contents);
    
    // Add system message if provided
    if (request.config.systemInstruction?.text) {
      messages.unshift({
        role: 'system',
        content: request.config.systemInstruction.text
      });
    }

    const openaiRequest: OpenAI.Chat.ChatCompletionCreateParams = {
      model: request.model || this.config.model || 'gpt-4o-mini',
      messages,
      max_tokens: request.config.maxTokens || this.config.maxTokens || 4096,
      temperature: request.config.temperature || 0.7,
      top_p: request.config.topP || 1,
    };

    // Handle JSON schema response
    if (request.config.responseJsonSchema) {
      openaiRequest.response_format = {
        type: 'json_object'
      };
    }

    const response = await this.openai.chat.completions.create(openaiRequest);
    return this.convertFromOpenAIResponse(response);
  }

  async generateContentStream(
    request: NomaGenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<NomaGenerateContentResponse>> {
    console.error('[DEBUG] Using OpenAI NomaClient for streaming');
    return this._generateContentStreamInternal(request, userPromptId);
  }

  private async *_generateContentStreamInternal(
    request: NomaGenerateContentParameters,
    userPromptId: string,
  ): AsyncGenerator<NomaGenerateContentResponse> {
    const messages = this.convertToOpenAIMessages(request.contents);
    
    // Add system message if provided
    if (request.config.systemInstruction?.text) {
      messages.unshift({
        role: 'system',
        content: request.config.systemInstruction.text
      });
    }

    const openaiRequest: OpenAI.Chat.ChatCompletionCreateParams = {
      model: request.model || this.config.model || 'gpt-4o-mini',
      messages,
      max_tokens: request.config.maxTokens || this.config.maxTokens || 4096,
      temperature: request.config.temperature || 0.7,
      top_p: request.config.topP || 1,
      stream: true,
    };

    const stream = await this.openai.chat.completions.create(openaiRequest);
    
    let fullContent = '';
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      if (delta?.content) {
        console.error(`[DEBUG] Delta content: "${delta.content}"`); // Debug log
        fullContent += delta.content;
        console.error(`[DEBUG] Full content so far: "${fullContent}"`); // Debug log
        yield {
          candidates: [{
            content: {
              role: 'model',
              parts: [{ text: delta.content }] // Only return the new delta content, not the full content
            },
            finishReason: chunk.choices[0]?.finish_reason || undefined
          }],
          text: delta.content // Only return the new delta content, not the full content
        };
      }
    }
  }

  async countTokens(request: NomaCountTokensParameters): Promise<NomaCountTokensResponse> {
    // OpenAI doesn't have a direct token counting API, so we'll estimate
    // This is a rough estimation - for production use, consider using tiktoken
    const text = request.contents.map(content => 
      content.parts.map(part => part.text || '').filter(Boolean).join('')
    ).join('');
    
    // Rough estimation: ~4 characters per token for English text
    const estimatedTokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: estimatedTokens
    };
  }

  async embedContent(request: NomaEmbedContentParameters): Promise<NomaEmbedContentResponse> {
    const response = await this.openai.embeddings.create({
      model: request.model || 'text-embedding-3-small',
      input: request.contents,
    });

    return {
      embeddings: response.data.map(item => ({
        values: item.embedding
      }))
    };
  }

  static createFromConfig(config: Config): NomaClient {
    const apiKey = process.env.OPENAI_API_KEY || process.env.NOMA_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is required. Set OPENAI_API_KEY or NOMA_API_KEY environment variable.');
    }

    return new NomaClient({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL,
      model: config.getModel() || 'gpt-4o-mini',
      maxTokens: 4096,
    });
  }
}