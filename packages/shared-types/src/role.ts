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

export interface RoleModel {
  id: string;
  name: string;
  description?: string;
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
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
