import { Store, Search } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">技能市场</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            为你的角色和工作流安装扩展技能
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
          发布技能
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索技能..."
          className="w-full rounded-md border bg-background py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
        <Store className="size-12 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">技能加载中...</p>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { value: "all", label: "全部" },
  { value: "search", label: "搜索" },
  { value: "code", label: "代码执行" },
  { value: "data", label: "数据分析" },
  { value: "file", label: "文件处理" },
  { value: "notification", label: "通知推送" },
  { value: "integration", label: "第三方集成" },
];
