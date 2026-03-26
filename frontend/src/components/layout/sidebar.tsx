"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Workflow,
  Store,
  Server,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/roles", icon: Bot, label: "角色中心" },
  { href: "/workflow", icon: Workflow, label: "工作流" },
  { href: "/skills", icon: Store, label: "技能市场" },
  { href: "/mcp", icon: Server, label: "MCP 配置" },
  { href: "/executions", icon: BarChart2, label: "执行监控" },
  { href: "/settings", icon: Settings, label: "设置" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Zap className="size-6 shrink-0 text-primary" />
        {!collapsed && (
          <span className="font-semibold text-lg tracking-tight">
            AgentFlow
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 flex size-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
        aria-label={collapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        {collapsed ? (
          <ChevronRight className="size-3" />
        ) : (
          <ChevronLeft className="size-3" />
        )}
      </button>
    </aside>
  );
}
