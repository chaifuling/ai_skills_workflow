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
