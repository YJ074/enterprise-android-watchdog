
import { devices } from "@/lib/mock-data";
import { differenceInHours } from "date-fns";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardTabs } from "./DashboardTabs";

export function Dashboard() {
  // Calculate inactive devices (devices not seen in the last 24 hours)
  const inactiveDevices = devices.filter(device => {
    const lastSeen = new Date(device.lastSeen);
    const hoursSinceLastSeen = differenceInHours(new Date(), lastSeen);
    return hoursSinceLastSeen > 24 || device.status === 'offline';
  });

  // Add state for selected devices to pass to DeviceListTable
  const [selectedDevices, setSelectedDevices] = useState([]);
  const { toast } = useToast();
  
  // Dummy handlers for the device list table
  const handleSelectDevice = () => {
    // This is a placeholder since we don't need device selection in the dashboard
  };
  
  const handleSelectAll = () => {
    // This is a placeholder since we don't need bulk selection in the dashboard
  };
  
  // Simple refresh function
  const refreshView = () => {
    console.log("Refreshing dashboard view");
    window.location.reload();
    toast({
      title: "View Refreshed",
      description: "The dashboard has been refreshed.",
    });
  };

  return (
    <div className="space-y-6">
      <DashboardHeader refreshView={refreshView} />
      <DashboardTabs 
        inactiveDevices={inactiveDevices}
        selectedDevices={selectedDevices}
        handleSelectDevice={handleSelectDevice}
        handleSelectAll={handleSelectAll}
        devices={devices}
      />
    </div>
  );
}
