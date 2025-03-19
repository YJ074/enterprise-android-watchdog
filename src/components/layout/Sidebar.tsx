
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  
  // Reset sidebar state when route changes
  useEffect(() => {
    // If we're on a software page, collapse the sidebar by default
    if (location.pathname.includes('/software')) {
      setExpanded(false);
    }
  }, [location.pathname]);
  
  return (
    <aside
      data-testid="main-sidebar"
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
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
