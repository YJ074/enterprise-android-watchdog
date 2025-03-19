
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarFooter } from "./sidebar/SidebarFooter";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        expanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <SidebarHeader collapsed={collapsed} onClose={() => setExpanded(false)} />
      <SidebarNavigation collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}
