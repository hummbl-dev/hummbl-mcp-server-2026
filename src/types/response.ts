export interface MCPBaseResponse {
  id: string;
  protocol_version: string;
}

export interface MCPSuccessResponse<T = unknown> extends MCPBaseResponse {
  ok: true;
  result: T;
}

export interface MCPErrorResponse extends MCPBaseResponse {
  ok: false;
  error: {
    code: MCPErrorCode;
    message: string;
    details?: unknown;
  };
}

export type MCPResponse<T = unknown> =
  | MCPSuccessResponse<T>
  | MCPErrorResponse;
