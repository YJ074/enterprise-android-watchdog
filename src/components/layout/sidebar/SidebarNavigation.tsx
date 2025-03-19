
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

interface SidebarNavigationProps {
  collapsed?: boolean;
}

export function SidebarNavigation({ collapsed = false }: SidebarNavigationProps) {
  return (
    <nav className="flex-1 overflow-auto py-4">
      <ul className="grid grid-flow-row gap-1 px-2 text-sm">
        {/* Dashboard Link */}
        <SidebarNavItem 
          to="/" 
          icon={LayoutDashboard} 
          label="Dashboard" 
          collapsed={collapsed}
        />
        
        {/* Devices Link */}
        <SidebarNavItem 
          to="/devices" 
          icon={Smartphone} 
          label="Devices" 
          collapsed={collapsed}
        />
        
        {/* Computer MDM Link */}
        <SidebarNavItem 
          to="/computer-mdm" 
          icon={Laptop} 
          label="Computer MDM" 
          collapsed={collapsed}
        />
        
        {/* MDM Profiles Link */}
        <SidebarNavItem 
          to="/mdm-profiles" 
          icon={Shield} 
          label="MDM Profiles" 
          collapsed={collapsed}
        />

        {/* Software Link - Highlighted */}
        <SidebarNavItem 
          to="/software" 
          icon={PackageOpen} 
          label="Software" 
          collapsed={collapsed}
          highlight={true}
        />

        {/* Users Link */}
        <SidebarNavItem 
          to="/users" 
          icon={Users} 
          label="Users" 
          collapsed={collapsed}
        />

        {/* Activity Link */}
        <SidebarNavItem 
          to="/activity" 
          icon={Activity} 
          label="Activity" 
          collapsed={collapsed}
        />

        {/* Security Link */}
        <SidebarNavItem 
          to="/security" 
          icon={ShieldAlert} 
          label="Security" 
          collapsed={collapsed}
        />

        {/* Migrations Link */}
        <SidebarNavItem 
          to="/migrations" 
          icon={FileDown} 
          label="Migrations" 
          collapsed={collapsed}
        />

        {/* Alerts Link */}
        <SidebarNavItem 
          to="/alerts" 
          icon={Bell} 
          label="Alerts" 
          collapsed={collapsed}
        />

        {/* Settings Link */}
        <SidebarNavItem 
          to="/settings" 
          icon={Settings} 
          label="Settings" 
          collapsed={collapsed}
        />
      </ul>
    </nav>
  );
}
