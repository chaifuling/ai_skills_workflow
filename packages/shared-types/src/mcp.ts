export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface MCPServer {
  id: string;
  displayName: string;
  transport: "stdio" | "sse" | "http";
  command?: string;
  url?: string;
  env?: Record<string, string>;
  status: "connected" | "disconnected" | "error" | "testing";
  tools?: MCPTool[];
  createdAt: string;
}
