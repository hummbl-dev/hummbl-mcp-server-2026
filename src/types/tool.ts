export interface MCPTool {
  name: string;
  version: string;
  description?: string;
  input_schema: object;
  output_schema?: object;
  streaming?: boolean;
}
