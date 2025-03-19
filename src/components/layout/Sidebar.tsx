
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Smartphone,
  Users,
  Activity,
  Bell,
  Settings,
  FileText,
  BarChart3,
  Shield
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Devices", href: "/devices", icon: Smartphone },
    { name: "Users", href: "/users", icon: Users },
    { name: "Activity", href: "/activity", icon: Activity },
    { name: "Alerts", href: "/alerts", icon: Bell },
    { name: "Security", href: "/security", icon: Shield },
    { name: "Reports", href: "/reports", icon: FileText, disabled: true },
    { name: "Analytics", href: "/analytics", icon: BarChart3, disabled: true },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r flex flex-col overflow-y-auto w-64 p-4 pr-0 max-h-screen sticky top-0",
        className
      )}
      {...props}
    >
      <div className="space-y-1 pr-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.disabled ? "#" : item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive(item.href)
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
              item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
            )}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
              }
            }}
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
