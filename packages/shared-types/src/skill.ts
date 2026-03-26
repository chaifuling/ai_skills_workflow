export type SkillCategory =
  | "search"
  | "code"
  | "data"
  | "file"
  | "notification"
  | "integration"
  | "ai"
  | string;

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
