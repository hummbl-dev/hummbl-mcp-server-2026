export type MCPRequestType =
  | "initialize"
  | "discover"
  | "invoke"
  | "stream"
  | "finalize";

export interface MCPBaseRequest {
  id: string;
  type: MCPRequestType;
  protocol_version: string;
}

export interface MCPInitializeRequest extends MCPBaseRequest {
  type: "initialize";
  client: {
    name: string;
    version: string;
  };
}

export interface MCPDiscoverRequest extends MCPBaseRequest {
  type: "discover";
}

export interface MCPInvokeRequest extends MCPBaseRequest {
  type: "invoke";
  tool: string;
  arguments: unknown;
}

export type MCPRequest =
  | MCPInitializeRequest
  | MCPDiscoverRequest
  | MCPInvokeRequest;
