
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Smartphone, 
  Activity, 
  Settings, 
  Shield, 
  AlertTriangle, 
  Users
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, active }: SidebarItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-enterprise-800 transition-colors",
        active && "bg-enterprise-800 text-white font-medium"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="h-full w-60 flex flex-col border-r border-enterprise-800 bg-enterprise-900 text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Shield className="text-enterprise-500" />
          Watchdog MDM
        </h1>
      </div>
      
      <div className="px-3 py-2">
        <nav className="space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            to="/" 
            active={location.pathname === '/'} 
          />
          <SidebarItem 
            icon={Smartphone} 
            label="Devices" 
            to="/devices" 
            active={location.pathname === '/devices'} 
          />
          <SidebarItem 
            icon={Activity} 
            label="Activity" 
            to="/activity" 
            active={location.pathname === '/activity'} 
          />
          <SidebarItem 
            icon={AlertTriangle} 
            label="Alerts" 
            to="/alerts" 
            active={location.pathname === '/alerts'} 
          />
          <SidebarItem 
            icon={Users} 
            label="Users" 
            to="/users" 
            active={location.pathname === '/users'} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            to="/settings" 
            active={location.pathname === '/settings'} 
          />
        </nav>
      </div>
    </div>
  );
}
