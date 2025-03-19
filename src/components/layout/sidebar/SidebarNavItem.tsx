
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed?: boolean;
  highlight?: boolean;
}

export function SidebarNavItem({ 
  to, 
  icon: Icon, 
  label, 
  collapsed = false,
  highlight = false 
}: SidebarNavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({isActive}) => cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
          highlight && isActive 
            ? "bg-primary text-primary-foreground font-medium" 
            : isActive && "bg-muted text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        {!collapsed && <span>{label}</span>}
      </NavLink>
    </li>
  );
}
