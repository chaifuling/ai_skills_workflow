import { Server, Plus } from "lucide-react";

export default function MCPPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">MCP 配置中心</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理 Model Context Protocol 服务器连接与工具授权
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          添加 MCP 服务器
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
        <Server className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <p className="font-medium">还没有 MCP 连接</p>
          <p className="mt-1 text-sm text-muted-foreground">
            添加 GitHub、PostgreSQL、Slack 等 MCP 服务器，为角色和工作流提供工具能力
          </p>
        </div>
      </div>
    </div>
  );
}
