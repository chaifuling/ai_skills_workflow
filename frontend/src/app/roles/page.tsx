import { Bot, Plus } from "lucide-react";

export default function RolesPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">角色模型中心</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            为不同垂直领域设计和管理 AI Agent 角色
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          新建角色
        </button>
      </div>

      {/* Domain filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {DOMAINS.map((d) => (
          <button
            key={d.value}
            className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
        <Bot className="size-12 text-muted-foreground/50" />
        <div className="text-center">
          <p className="font-medium">还没有角色</p>
          <p className="mt-1 text-sm text-muted-foreground">
            点击「新建角色」或从模板库中选择一个垂直领域角色
          </p>
        </div>
      </div>
    </div>
  );
}

const DOMAINS = [
  { value: "all", label: "全部" },
  { value: "customer-service", label: "客户服务" },
  { value: "legal", label: "法律" },
  { value: "medical", label: "医疗健康" },
  { value: "software", label: "软件开发" },
  { value: "education", label: "教育培训" },
  { value: "finance", label: "金融" },
  { value: "ecommerce", label: "电商" },
];
