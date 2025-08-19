/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import OpenAI from 'openai';
import { Config } from '../config/config.js';
// import { UserTierId } from '../code_assist/types.js'; // Temporarily disabled
export type UserTierId = string; // Temporary type
// import { LoggingContentGenerator } from './loggingContentGenerator.js';

// Legacy compatibility types - exported for backward compatibility
export type Content = NomaContent;
export type GenerateContentResponse = NomaGenerateContentResponse;
export type GenerateContentParameters = NomaGenerateContentParameters;
export type CountTokensParameters = NomaCountTokensParameters;
export type CountTokensResponse = NomaCountTokensResponse;
export type EmbedContentParameters = NomaEmbedContentParameters;
export type EmbedContentResponse = NomaEmbedContentResponse;
export type PartListUnion = Part[];
export type GenerateContentConfig = {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxTokens?: number;
  maxOutputTokens?: number;
  candidateCount?: number;
  stopSequences?: string[];
  responseLogprobs?: boolean;
  systemInstruction?: { text: string };
  tools?: Tool[];
  toolConfig?: any;
  labels?: Record<string, string>;
  safetySettings?: any[];
  cachedContent?: string;
  logprobs?: boolean;
  presencePenalty?: number;
  frequencyPenalty?: number;
  seed?: number;
  responseMimeType?: string;
  responseJsonSchema?: Record<string, unknown>;
  routingConfig?: GenerationConfigRoutingConfig;
  modelSelectionConfig?: ModelSelectionConfig;
  responseModalities?: string[];
  mediaResolution?: MediaResolution;
  speechConfig?: SpeechConfigUnion;
  audioTimestamp?: boolean;
  thinkingConfig?: ThinkingConfig;
  abortSignal?: AbortSignal;
};

// Tool and function types
export interface FunctionDeclaration {
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
  parametersJsonSchema?: Record<string, unknown>;
}

export interface Tool {
  functionDeclarations: FunctionDeclaration[];
}

export interface CallableTool {
  function: FunctionDeclaration;
}

export interface FunctionCall {
  name: string;
  args: Record<string, unknown>;
  id?: string;
}

export interface FunctionResponse {
  name: string;
  response: Record<string, unknown>;
  id?: string;
}

// Part types - unified interface for different content parts
export interface Part {
  text?: string;
  fileData?: { mimeType: string; fileUri?: string };
  functionCall?: FunctionCall;
  functionResponse?: FunctionResponse;
  inlineData?: { mimeType: string; data: string };
  videoMetadata?: unknown;
  thought?: string;
  codeExecutionResult?: unknown;
  executableCode?: unknown;
}

// Enhanced PartListUnion type
export type ContentListUnion = NomaContent[];
export type ContentUnion = NomaContent;

// Finish reason and error types
export type FinishReason = 'stop' | 'length' | 'content_filter' | 'function_call' | null;
export type BlockedReason = 'BLOCKED_REASON_UNSPECIFIED' | 'SAFETY' | 'OTHER';

// Grounding and metadata types
export interface GroundingMetadata {
  webSearchQueries?: string[];
  searchEntryPoint?: {
    renderedContent?: string;
  };
  groundingChunks?: Array<{
    web?: {
      uri?: string;
      title?: string;
    };
  }>;
  groundingSupports?: any[];
}

// Models interface for compatibility
export interface Models {
  generateContent: (params: NomaGenerateContentParameters) => Promise<NomaGenerateContentResponse>;
  generateContentStream: (params: NomaGenerateContentParameters) => Promise<AsyncGenerator<NomaGenerateContentResponse>>;
  countTokens: (params: NomaCountTokensParameters) => Promise<NomaCountTokensResponse>;
  embedContent: (params: NomaEmbedContentParameters) => Promise<NomaEmbedContentResponse>;
}

// Additional compatibility types
export interface GenerationConfigRoutingConfig {
  mode?: string;
}

export interface MediaResolution {
  width?: number;
  height?: number;
}

export interface Candidate {
  content: NomaContent;
  finishReason?: string;
  index?: number;
  urlContextMetadata?: any;
  groundingMetadata?: GroundingMetadata;
}

export interface ModelSelectionConfig {
  model?: string;
}

export interface GenerateContentResponsePromptFeedback {
  blockReason?: BlockedReason;
}

export interface GenerateContentResponseUsageMetadata {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
  cachedContentTokenCount?: number;
  thoughtsTokenCount?: number;
  toolUsePromptTokenCount?: number;
}

export interface SafetySetting {
  category?: string;
  threshold?: string;
}

export type PartUnion = Part;
export type SpeechConfigUnion = any;
export type ThinkingConfig = { includeThoughts?: boolean };
export type ToolListUnion = Tool[];
export type ToolConfig = any;
export type Type = any;
export type Schema = Record<string, unknown>;

// Additional compatibility types for tools
export interface CallableTool {
  function: FunctionDeclaration;
  callTool?: (args: Record<string, unknown>) => Promise<unknown>;
}

// MCP to Tool conversion function placeholder
export function mcpToTool(mcpTool: unknown): Tool {
  // This is a compatibility stub - implementation should be provided
  return { functionDeclarations: [] };
}

// GoogleGenAI compatibility class
export class GoogleGenAI {
  public models: Models;
  
  constructor(config: { apiKey?: string; vertexai?: boolean; httpOptions?: any }) {
    // This is a compatibility shim - actual implementation will use OpenAI
    this.models = {} as Models;
  }
}

// OpenAI-compatible types for Noma CLI
export interface NomaGenerateContentParameters {
  model: string;
  config: {
    systemInstruction?: { text: string };
    temperature?: number;
    topP?: number;
    topK?: number;
    maxTokens?: number;
    maxOutputTokens?: number;
    candidateCount?: number;
    stopSequences?: string[];
    responseLogprobs?: boolean;
    stream?: boolean;
    responseJsonSchema?: Record<string, unknown>;
    responseMimeType?: string;
    abortSignal?: AbortSignal;
    tools?: Tool[];
    toolConfig?: any;
    labels?: Record<string, string>;
    safetySettings?: any[];
    cachedContent?: string;
    logprobs?: boolean;
    presencePenalty?: number;
    frequencyPenalty?: number;
    seed?: number;
    routingConfig?: GenerationConfigRoutingConfig;
    modelSelectionConfig?: ModelSelectionConfig;
    responseModalities?: string[];
    mediaResolution?: MediaResolution;
    speechConfig?: SpeechConfigUnion;
    audioTimestamp?: boolean;
    thinkingConfig?: ThinkingConfig;
  };
  contents: NomaContent[];
}

export interface NomaContent {
  role: 'user' | 'model' | 'system';
  parts: Part[];
}

export interface NomaGenerateContentResponse {
  candidates?: Candidate[];
  text?: string;
  promptFeedback?: GenerateContentResponsePromptFeedback;
  usageMetadata?: GenerateContentResponseUsageMetadata;
  automaticFunctionCallingHistory?: any[];
}

export interface NomaCountTokensParameters {
  model: string;
  contents: NomaContent[];
}

export interface NomaCountTokensResponse {
  totalTokens?: number;
}

export interface NomaEmbedContentParameters {
  model: string;
  contents: string[];
}

export interface NomaEmbedContentResponse {
  embeddings: Array<{ values: number[] }>;
}

/**
 * Interface abstracting the core functionalities for generating content and counting tokens.
 */
export interface ContentGenerator {
  generateContent(
    request: NomaGenerateContentParameters,
    userPromptId: string,
  ): Promise<NomaGenerateContentResponse>;

  generateContentStream(
    request: NomaGenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<NomaGenerateContentResponse>>;

  countTokens(request: NomaCountTokensParameters): Promise<NomaCountTokensResponse>;

  embedContent(request: NomaEmbedContentParameters): Promise<NomaEmbedContentResponse>;

  userTier?: UserTierId;
}

export enum AuthType {
  USE_OPENAI = 'openai-api-key',
  // Legacy enum values for compatibility
  LOGIN_WITH_GOOGLE = 'oauth-personal',
  USE_VERTEX_AI = 'vertex-ai',
  CLOUD_SHELL = 'cloud-shell',
  USE_GEMINI = 'gemini-api-key',
}

export type ContentGeneratorConfig = {
  model: string;
  apiKey?: string;
  baseURL?: string;
  authType?: AuthType | undefined;
  proxy?: string | undefined;
};

export function createContentGeneratorConfig(
  config: Config,
  authType: AuthType | undefined,
): ContentGeneratorConfig {
  const openaiApiKey = process.env.OPENAI_API_KEY || process.env.NOMA_API_KEY || undefined;
  const openaiBaseURL = process.env.OPENAI_BASE_URL || undefined;

  // Use runtime model from config if available; otherwise, fall back to default OpenAI model
  const effectiveModel = config.getModel() || 'gpt-4o-mini';

  const contentGeneratorConfig: ContentGeneratorConfig = {
    model: effectiveModel,
    authType,
    proxy: config?.getProxy(),
  };

  if (authType === AuthType.USE_OPENAI && openaiApiKey) {
    contentGeneratorConfig.apiKey = openaiApiKey;
    contentGeneratorConfig.baseURL = openaiBaseURL;
    return contentGeneratorConfig;
  }

  return contentGeneratorConfig;
}

export async function createContentGenerator(
  config: ContentGeneratorConfig,
  gcConfig: Config,
  sessionId?: string,
): Promise<ContentGenerator> {
  console.error(`[DEBUG] Creating content generator with authType: ${config.authType}`);
  if (config.authType === AuthType.USE_OPENAI) {
    console.error('[DEBUG] Using OpenAI content generator');
    const { NomaClient } = await import('./openaiClient.js');
    const nomaClient = new NomaClient({
      apiKey: config.apiKey!,
      baseURL: config.baseURL,
      model: config.model,
    });
    console.error('[DEBUG] Created OpenAI NomaClient');
    // return new LoggingContentGenerator(nomaClient, gcConfig);
    return nomaClient;
  }
  
  throw new Error(
    `Error creating contentGenerator: Unsupported authType: ${config.authType}`,
  );
}
