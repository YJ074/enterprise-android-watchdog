
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PackageOpen } from "lucide-react";
import { OverviewTabContent } from "./tabs/OverviewTabContent";
import { AnalyticsDashboard } from "../analytics/AnalyticsDashboard";
import { DeviceMetricsChart } from "../analytics/DeviceMetricsChart";
import { ActivityDistributionChart } from "../analytics/ActivityDistributionChart";
import { DeviceStatusDistributionChart } from "../analytics/DeviceStatusDistributionChart";
import { SoftwareDashboard } from "./SoftwareDashboard";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface DashboardTabsProps {
  inactiveDevices: any[];
  selectedDevices: any[];
  handleSelectDevice: () => void;
  handleSelectAll: () => void;
  devices: any[];
}

export function DashboardTabs({
  inactiveDevices,
  selectedDevices,
  handleSelectDevice,
  handleSelectAll,
  devices
}: DashboardTabsProps) {
  // Always default to software tab and ensure it's visible
  const [activeTab, setActiveTab] = useState("software");
  const { toast } = useToast();
  
  // Use effect to ensure the software tab is really active and visible
  useEffect(() => {
    console.log("Dashboard initialized, setting active tab to software");
    
    // Set a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setActiveTab("software");
      console.log("Software tab activated programmatically");
      
      toast({
        title: "Software Dashboard Ready",
        description: "You're viewing the Software Management section.",
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // Simple refresh function
  const refreshView = () => {
    console.log("Refreshing dashboard view");
    setActiveTab("none");
    setTimeout(() => {
      setActiveTab("software");
      toast({
        title: "View Refreshed",
        description: "The Software Dashboard has been refreshed.",
      });
    }, 100);
  };
  
  // Make sure the software content has a unique key to force re-rendering
  const softwareContentKey = `software-${Date.now()}`;

  return (
    <Tabs 
      value={activeTab}
      onValueChange={(value) => {
        console.log("Tab changed to:", value);
        setActiveTab(value);
      }}
      className="space-y-4"
      defaultValue="software"
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
        <TabsTrigger 
          value="software" 
          className="bg-primary text-primary-foreground ring-2 ring-primary/20 font-semibold"
        >
          <PackageOpen className="h-4 w-4 mr-2" />
          Software
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <OverviewTabContent 
          inactiveDevices={inactiveDevices}
          selectedDevices={selectedDevices}
          handleSelectDevice={handleSelectDevice}
          handleSelectAll={handleSelectAll}
          devices={devices}
        />
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
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-md mb-4 shadow-sm">
          <h3 className="text-lg font-medium text-blue-800 flex items-center">
            <PackageOpen className="h-5 w-5 mr-2 text-blue-600" />
            Software Management Dashboard
          </h3>
          <p className="text-blue-700 mt-1">
            View and manage software installed across all devices in your organization.
            Track installation counts, versions, and identify potential security risks.
          </p>
        </div>
        <SoftwareDashboard key={softwareContentKey} />
      </TabsContent>
    </Tabs>
  );
}
