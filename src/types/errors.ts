export enum MCPErrorCode {
  INVALID_REQUEST = "INVALID_REQUEST",
  SCHEMA_VIOLATION = "SCHEMA_VIOLATION",
  TOOL_NOT_FOUND = "TOOL_NOT_FOUND",
  INVOCATION_ERROR = "INVOCATION_ERROR",
  PROTOCOL_MISMATCH = "PROTOCOL_MISMATCH",
  INTERNAL_ERROR = "INTERNAL_ERROR"
}

export class MCPError extends Error {
  readonly code: MCPErrorCode;
  readonly details?: unknown;

  constructor(code: MCPErrorCode, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
  }
}
