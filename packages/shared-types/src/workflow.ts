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

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

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
