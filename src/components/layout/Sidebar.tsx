
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Layers,
  LayoutDashboard,
  Smartphone,
  Users,
  Activity,
  ShieldAlert,
  Settings,
  Bell,
  X,
  Shield,
  Laptop,
  FileDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background transition-transform",
        expanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-enterprise-900"
        >
          <Layers className="h-6 w-6" />
          <span>ACME MDM</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:hidden"
          onClick={() => setExpanded(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid grid-flow-row gap-1 px-2 text-sm">
          {/* Dashboard Link */}
          <li>
            <NavLink
              to="/"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          {/* Devices Link */}
          <li>
            <NavLink
              to="/devices"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Smartphone className="h-4 w-4" />
              <span>Devices</span>
            </NavLink>
          </li>
          
          {/* Computer MDM Link */}
          <li>
            <NavLink
              to="/computer-mdm"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Laptop className="h-4 w-4" />
              <span>Computer MDM</span>
            </NavLink>
          </li>
          
          {/* MDM Profiles Link */}
          <li>
            <NavLink
              to="/mdm-profiles"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Shield className="h-4 w-4" />
              <span>MDM Profiles</span>
            </NavLink>
          </li>

          {/* Users Link */}
          <li>
            <NavLink
              to="/users"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </NavLink>
          </li>

          {/* Activity Link */}
          <li>
            <NavLink
              to="/activity"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </NavLink>
          </li>

          {/* Security Link */}
          <li>
            <NavLink
              to="/security"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Security</span>
            </NavLink>
          </li>

          {/* Migrations Link - NEW */}
          <li>
            <NavLink
              to="/migrations"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <FileDown className="h-4 w-4" />
              <span>Migrations</span>
            </NavLink>
          </li>

          {/* Alerts Link */}
          <li>
            <NavLink
              to="/alerts"
              className={({isActive}) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                )
              }
            >
              <Bell className="h-4 w-4" />
              <span>Alerts</span>
            </NavLink>
          </li>

          {/* Settings Link */}
          <li>
            <NavLink
              to="/settings"
              className={({isActive}) => cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="border-t p-4">
        <p className="text-muted-foreground text-xs">
          ACME Corp. &copy; {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
