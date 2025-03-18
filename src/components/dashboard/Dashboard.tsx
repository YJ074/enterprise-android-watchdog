
import { DashboardMetricCard } from "./DashboardMetricCard";
import { DeviceStatusChart } from "./DeviceStatusChart";
import { RecentActivityList } from "./RecentActivityList";
import { RecentAlerts } from "../alerts/RecentAlerts";
import { metrics, devices } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { DeviceListTable } from "../devices/DeviceListTable";
import { Link } from "react-router-dom";
import { AlertTriangle, Smartphone, Plus } from "lucide-react";
import { AddDeviceDialog } from "../devices/AddDeviceDialog";
import { differenceInHours } from "date-fns";
import { InactiveDevicesCard } from "./InactiveDevicesCard";

export function Dashboard() {
  // Calculate inactive devices (devices not seen in the last 24 hours)
  const inactiveDevices = devices.filter(device => {
    const lastSeen = new Date(device.lastSeen);
    const hoursSinceLastSeen = differenceInHours(new Date(), lastSeen);
    return hoursSinceLastSeen > 24 || device.status === 'offline';
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <DashboardMetricCard key={metric.name} metric={metric} />
        ))}
      </div>

      <InactiveDevicesCard devices={inactiveDevices} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviceStatusChart />
        <RecentAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityList />
        <div>
          <h2 className="text-xl font-semibold mb-4">Device Overview</h2>
          <DeviceListTable />
        </div>
      </div>
    </div>
  );
}
