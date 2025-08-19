/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { NomaContent } from '../core/contentGenerator.js';

// Type alias for compatibility
type Content = NomaContent;

export function isFunctionResponse(content: Content): boolean {
  // For OpenAI-compatible implementation, check if content has function response patterns
  return (
    content.role === 'user' &&
    !!content.parts &&
    content.parts.some((part) => 
      part.text && (part.text.includes('function_result') || part.text.includes('tool_result'))
    )
  );
}

export function isFunctionCall(content: Content): boolean {
  // For OpenAI-compatible implementation, check if content has function call patterns
  return (
    content.role === 'model' &&
    !!content.parts &&
    content.parts.some((part) => 
      part.text && (part.text.includes('function_call') || part.text.includes('tool_call'))
    )
  );
}
