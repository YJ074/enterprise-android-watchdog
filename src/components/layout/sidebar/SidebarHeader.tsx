
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layers, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  collapsed?: boolean;
  onClose?: () => void;
}

export function SidebarHeader({ collapsed = false, onClose }: SidebarHeaderProps) {
  return (
    <div className="flex h-14 items-center border-b px-4">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-lg text-enterprise-900"
      >
        <Layers className="h-6 w-6" />
        {!collapsed && <span>ACME MDM</span>}
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto lg:hidden"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
