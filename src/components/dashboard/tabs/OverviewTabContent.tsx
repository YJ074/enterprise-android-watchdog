
import { DashboardMetricCard } from "../DashboardMetricCard";
import { DeviceStatusChart } from "../DeviceStatusChart";
import { RecentActivityList } from "../RecentActivityList";
import { RecentAlerts } from "../../alerts/RecentAlerts";
import { metrics } from "@/lib/mock-data";
import { DeviceListTable } from "../../devices/DeviceListTable";
import { InactiveDevicesCard } from "../InactiveDevicesCard";

interface OverviewTabContentProps {
  inactiveDevices: any[];
  selectedDevices: any[];
  handleSelectDevice: () => void;
  handleSelectAll: () => void;
  devices: any[];
}

export function OverviewTabContent({
  inactiveDevices,
  selectedDevices,
  handleSelectDevice,
  handleSelectAll,
  devices
}: OverviewTabContentProps) {
  return (
    <>
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
          <DeviceListTable 
            devices={devices} 
            selectedDevices={selectedDevices}
            onSelectDevice={handleSelectDevice}
            onSelectAll={handleSelectAll}
          />
        </div>
      </div>
    </>
  );
}
