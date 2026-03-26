import { BarChart2 } from "lucide-react";

export default function ExecutionsPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">执行监控</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          查看工作流运行历史、日志与节点详情
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
        <BarChart2 className="size-12 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">暂无执行记录</p>
      </div>
    </div>
  );
}
