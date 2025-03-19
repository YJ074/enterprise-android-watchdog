
import React from "react";

interface SidebarFooterProps {
  collapsed?: boolean;
}

export function SidebarFooter({ collapsed = false }: SidebarFooterProps) {
  return (
    <div className="border-t p-4">
      {!collapsed && (
        <p className="text-muted-foreground text-xs">
          ACME Corp. &copy; {new Date().getFullYear()}
        </p>
      )}
    </div>
  );
}
