import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">设置</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          管理工作区、成员权限和 API 密钥
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
        <Settings className="size-12 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">设置页面开发中...</p>
      </div>
    </div>
  );
}
