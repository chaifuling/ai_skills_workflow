import { Workflow, Plus } from "lucide-react";

export default function WorkflowPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">工作流</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            拖拽节点设计 AI 自动化工作流
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          新建工作流
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
        <Workflow className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <p className="font-medium">还没有工作流</p>
          <p className="mt-1 text-sm text-muted-foreground">
            点击「新建工作流」开始拖拽设计你的第一个 AI 工作流
          </p>
        </div>
      </div>
    </div>
  );
}
