
import { 
  LayoutDashboard,
  Smartphone,
  Laptop,
  Shield,
  PackageOpen,
  Users,
  Activity,
  ShieldAlert,
  FileDown,
  Bell,
  Settings
} from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { useLocation } from "react-router-dom";

interface SidebarNavigationProps {
  collapsed?: boolean;
}

export function SidebarNavigation({ collapsed = false }: SidebarNavigationProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="flex-1 overflow-auto py-4">
      <ul className="grid grid-flow-row gap-1 px-2 text-sm" data-testid="sidebar-navigation">
        {/* Dashboard Link */}
        <SidebarNavItem 
          to="/" 
          icon={LayoutDashboard} 
          label="Dashboard" 
          collapsed={collapsed}
          highlight={currentPath === "/"}
        />
        
        {/* Devices Link */}
        <SidebarNavItem 
          to="/devices" 
          icon={Smartphone} 
          label="Devices" 
          collapsed={collapsed}
          highlight={currentPath === "/devices"}
        />
        
        {/* Computer MDM Link */}
        <SidebarNavItem 
          to="/computer-mdm" 
          icon={Laptop} 
          label="Computer MDM" 
          collapsed={collapsed}
          highlight={currentPath === "/computer-mdm"}
        />
        
        {/* MDM Profiles Link */}
        <SidebarNavItem 
          to="/mdm-profiles" 
          icon={Shield} 
          label="MDM Profiles" 
          collapsed={collapsed}
          highlight={currentPath === "/mdm-profiles"}
        />

        {/* Software Link - Highlighted */}
        <SidebarNavItem 
          to="/software" 
          icon={PackageOpen} 
          label="Software" 
          collapsed={collapsed}
          highlight={currentPath === "/software"}
          data-testid="software-tab"
        />

        {/* Users Link */}
        <SidebarNavItem 
          to="/users" 
          icon={Users} 
          label="Users" 
          collapsed={collapsed}
          highlight={currentPath === "/users"}
        />

        {/* Activity Link */}
        <SidebarNavItem 
          to="/activity" 
          icon={Activity} 
          label="Activity" 
          collapsed={collapsed}
          highlight={currentPath === "/activity"}
        />

        {/* Security Link */}
        <SidebarNavItem 
          to="/security" 
          icon={ShieldAlert} 
          label="Security" 
          collapsed={collapsed}
          highlight={currentPath === "/security"}
        />

        {/* Migrations Link */}
        <SidebarNavItem 
          to="/migrations" 
          icon={FileDown} 
          label="Migrations" 
          collapsed={collapsed}
          highlight={currentPath === "/migrations"}
        />

        {/* Alerts Link */}
        <SidebarNavItem 
          to="/alerts" 
          icon={Bell} 
          label="Alerts" 
          collapsed={collapsed}
          highlight={currentPath === "/alerts"}
        />

        {/* Settings Link */}
        <SidebarNavItem 
          to="/settings" 
          icon={Settings} 
          label="Settings" 
          collapsed={collapsed}
          highlight={currentPath === "/settings"}
        />
      </ul>
    </nav>
  );
}
