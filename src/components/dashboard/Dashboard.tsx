
import { DashboardMetricCard } from "./DashboardMetricCard";
import { DeviceStatusChart } from "./DeviceStatusChart";
import { RecentActivityList } from "./RecentActivityList";
import { RecentAlerts } from "../alerts/RecentAlerts";
import { metrics, devices } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { DeviceListTable } from "../devices/DeviceListTable";
import { Link } from "react-router-dom";
import { AlertTriangle, BarChart3, Plus, Smartphone, PackageOpen } from "lucide-react";
import { AddDeviceDialog } from "../devices/AddDeviceDialog";
import { differenceInHours } from "date-fns";
import { InactiveDevicesCard } from "./InactiveDevicesCard";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsDashboard } from "../analytics/AnalyticsDashboard";
import { DeviceMetricsChart } from "../analytics/DeviceMetricsChart";
import { ActivityDistributionChart } from "../analytics/ActivityDistributionChart";
import { DeviceStatusDistributionChart } from "../analytics/DeviceStatusDistributionChart";
import { SoftwareDashboard } from "./SoftwareDashboard";

export function Dashboard() {
  // Calculate inactive devices (devices not seen in the last 24 hours)
  const inactiveDevices = devices.filter(device => {
    const lastSeen = new Date(device.lastSeen);
    const hoursSinceLastSeen = differenceInHours(new Date(), lastSeen);
    return hoursSinceLastSeen > 24 || device.status === 'offline';
  });

  // Add state for selected devices to pass to DeviceListTable
  const [selectedDevices, setSelectedDevices] = useState([]);
  
  // Set activeTab to "software" initially to make it visible first
  const [activeTab, setActiveTab] = useState("software");
  
  // Dummy handlers for the device list table
  const handleSelectDevice = () => {
    // This is a placeholder since we don't need device selection in the dashboard
  };
  
  const handleSelectAll = () => {
    // This is a placeholder since we don't need bulk selection in the dashboard
  };

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
          <Button asChild variant="outline">
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

      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="software" className="bg-primary text-primary-foreground">
            <PackageOpen className="h-4 w-4 mr-2" />
            Software
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <DeviceMetricsChart />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityDistributionChart />
            <DeviceStatusDistributionChart />
          </div>
        </TabsContent>

        <TabsContent value="software" className="space-y-6">
          <SoftwareDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
