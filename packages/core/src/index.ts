/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Export config
export * from './config/config.js';

// Export Core Logic
export * from './core/client.js';
export * from './core/contentGenerator.js';
export * from './core/nomaChat.js';

// Legacy compatibility exports
export { NomaClient as GeminiClient } from './core/client.js';
export { NomaChat as GeminiChat } from './core/nomaChat.js';
export { NomaEventType as GeminiEventType } from './core/turn.js';
export { 
  ServerNomaStreamEvent as ServerGeminiStreamEvent,
  ServerNomaContentEvent as ServerGeminiContentEvent, 
  ServerNomaErrorEvent as ServerGeminiErrorEvent,
  ServerNomaChatCompressedEvent as ServerGeminiChatCompressedEvent
} from './core/turn.js';
export * from './core/logger.js';
// export * from './core/prompts.js';
export * from './core/tokenLimits.js';
export * from './core/turn.js';
export * from './core/nomaRequest.js';
export * from './core/coreToolScheduler.js';
export * from './core/nonInteractiveToolExecutor.js';

// export * from './code_assist/types.js'; // Temporarily disabled

// Export utilities
export * from './utils/paths.js';
export * from './utils/schemaValidator.js';
export * from './utils/errors.js';
export * from './utils/getFolderStructure.js';
export * from './utils/memoryDiscovery.js';
export * from './utils/gitIgnoreParser.js';
export * from './utils/gitUtils.js';
export * from './utils/editor.js';
export * from './utils/quotaErrorDetection.js';
export * from './utils/fileUtils.js';
export * from './utils/retry.js';
export * from './utils/shell-utils.js';
export * from './utils/systemEncoding.js';
export * from './utils/textUtils.js';
export * from './utils/formatters.js';
export * from './utils/filesearch/fileSearch.js';

// Export services
export * from './services/fileDiscoveryService.js';
export * from './services/gitService.js';

// Export IDE specific logic
export * from './ide/ide-client.js';
export * from './ide/ideContext.js';
export * from './ide/ide-installer.js';
export { getIdeInfo, DetectedIde, IdeInfo } from './ide/detect-ide.js';

// Export Shell Execution Service
export * from './services/shellExecutionService.js';

// Export base tool definitions
export * from './tools/tools.js';
export * from './tools/tool-error.js';
export * from './tools/tool-registry.js';

// Export prompt logic
// export * from './prompts/mcp-prompts.js';

// Export specific tool logic
// export * from './tools/read-file.js';
// export * from './tools/ls.js';
// export * from './tools/grep.js';
// export * from './tools/glob.js';
// export * from './tools/edit.js';
// export * from './tools/write-file.js';
// export * from './tools/web-fetch.js';
// export * from './tools/memoryTool.js';
// export * from './tools/shell.js';
// export * from './tools/web-search.js';
// export * from './tools/read-many-files.js';
// export * from './tools/mcp-client.js';
// export * from './tools/mcp-tool.js';

// MCP OAuth
export { MCPOAuthProvider } from './mcp/oauth-provider.js';
export {
  MCPOAuthToken,
  MCPOAuthCredentials,
  MCPOAuthTokenStorage,
} from './mcp/oauth-token-storage.js';
export type { MCPOAuthConfig } from './mcp/oauth-provider.js';
export type {
  OAuthAuthorizationServerMetadata,
  OAuthProtectedResourceMetadata,
} from './mcp/oauth-utils.js';
export { OAuthUtils } from './mcp/oauth-utils.js';

// Export telemetry functions
export * from './telemetry/index.js';
export { sessionId } from './utils/session.js';
export * from './utils/browser.js';

// Temporary stub exports for CLI compatibility
export const getAllGeminiMdFilenames = () => [];
export const getMCPServerPrompts = () => [];
export const clearCachedCredentialFile = () => {};
export const getOauthClient = () => null;
export const setGeminiMdFilename = () => {};
export const getCurrentGeminiMdFilename = () => '';
export const executeToolCall = () => Promise.resolve({});
export const convertToFunctionResponse = () => ({});
export const createTransport = () => ({});
export const GEMINI_CONFIG_DIR = '.gemini';

export type DiscoveredMCPPrompt = any;
export type DiscoveredMCPTool = any;
export const getMCPDiscoveryState = () => ({});
export const getMCPServerStatus = () => ({});
export type MCPDiscoveryState = any;
export type MCPServerStatus = any;
export const mcpServerRequiresOAuth = () => false;
export type ToolConfirmationOutcome = any;
export type ToolCallConfirmationDetails = any;
export type ToolResult = any;
export type ToolResultDisplay = any;
export type ToolRegistry = any;
export type ToolConfirmationPayload = any;
export type ToolErrorType = any;
export type AnyDeclarativeTool = any;
export type AnyToolInvocation = any;
export type ToolExecuteConfirmationDetails = any;
export type ToolMcpConfirmationDetails = any;
export type CodeAssistServer = any;
export { CoreToolScheduler } from './core/coreToolScheduler';
export type ShellTool = any;
export type EditTool = any;
export type WriteFileTool = any;
export type UserTierId = string;
export { 
  ServerNomaFinishedEvent as ServerGeminiFinishedEvent
} from './core/turn.js';
