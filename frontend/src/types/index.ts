// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  members: WorkspaceMember[];
}

export interface WorkspaceMember {
  userId: string;
  role: "owner" | "admin" | "member" | "viewer";
}

// ─── Role Model ──────────────────────────────────────────────────────────────

export interface RoleModel {
  id: string;
  name: string;
  description: string;
  domain: RoleDomain;
  avatar?: string;
  systemPrompt: string;
  modelConfig: ModelConfig;
  skills: string[];
  mcpServers: string[];
  knowledgeBases: string[];
  memory: MemoryConfig;
  guardrails: GuardrailConfig;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export type RoleDomain =
  | "customer-service"
  | "legal"
  | "medical"
  | "software"
  | "education"
  | "finance"
  | "ecommerce"
  | "general"
  | string;

export interface ModelConfig {
  provider: "openai" | "anthropic" | "ollama" | string;
  modelId: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface MemoryConfig {
  windowSize: number;
  longTerm: boolean;
  summaryStrategy?: "none" | "auto" | "periodic";
}

export interface GuardrailConfig {
  topicBlacklist: string[];
  safeMode: boolean;
  maxResponseLength?: number;
}

// ─── Skill ───────────────────────────────────────────────────────────────────

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  version: string;
  author: string;
  tags: string[];
  rating: number;
  installCount: number;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  runtime: "nodejs" | "python" | "http";
  createdAt: string;
}

export type SkillCategory =
  | "search"
  | "code"
  | "data"
  | "file"
  | "notification"
  | "integration"
  | "ai"
  | string;

// ─── MCP ─────────────────────────────────────────────────────────────────────

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

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

// ─── Workflow ─────────────────────────────────────────────────────────────────

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: "draft" | "published" | "archived";
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables: WorkflowVariable[];
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export type WorkflowNodeType =
  | "trigger-manual"
  | "trigger-cron"
  | "trigger-webhook"
  | "ai-llm"
  | "ai-role"
  | "ai-agent"
  | "tool-skill"
  | "tool-mcp"
  | "tool-http"
  | "tool-code"
  | "logic-condition"
  | "logic-loop"
  | "logic-parallel"
  | "logic-merge"
  | "data-transform"
  | "data-variable"
  | "human-approval"
  | "human-notify";

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
}

export interface WorkflowVariable {
  key: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  defaultValue?: unknown;
  description?: string;
}

// ─── Execution ───────────────────────────────────────────────────────────────

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  trigger: "manual" | "cron" | "webhook";
  startedAt: string;
  finishedAt?: string;
  nodeExecutions: NodeExecution[];
  error?: string;
}

export interface NodeExecution {
  id: string;
  nodeId: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  startedAt: string;
  finishedAt?: string;
  error?: string;
  logs: string[];
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
