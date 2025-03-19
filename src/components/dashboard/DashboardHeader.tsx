
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle, Smartphone, PackageOpen, RefreshCw, Plus } from "lucide-react";
import { AddDeviceDialog } from "../devices/AddDeviceDialog";

interface DashboardHeaderProps {
  refreshView: () => void;
}

export function DashboardHeader({ refreshView }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={refreshView}
          className="border-blue-200 hover:bg-blue-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh View
        </Button>
        <Button asChild variant="outline">
          <Link to="/alerts">
            <AlertTriangle className="h-4 w-4 mr-2" />
            View Alerts
          </Link>
        </Button>
        <Button asChild>
          <Link to="/devices">
            <Smartphone className="h-4 w-4 mr-2" />
            Manage Devices
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100">
          <Link to="/software">
            <PackageOpen className="h-4 w-4 mr-2" />
            Software Management
          </Link>
        </Button>
        <AddDeviceDialog 
          trigger={
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          }
        />
      </div>
    </div>
  );
}
