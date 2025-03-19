
import { useState, useEffect } from 'react';
import { devices } from "@/lib/mock-data";
import { Application } from '@/lib/types/device.types';
import { useToast } from "@/components/ui/use-toast";

interface ApplicationWithDevice extends Application {
  deviceName: string;
  deviceModel: string;
  deviceOS: string;
}

export function useSoftwareData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Extract all applications from all devices
  const allApplications = devices.flatMap(device => 
    device.applications.map(app => ({
      ...app,
      deviceName: device.name,
      deviceModel: device.model,
      deviceOS: device.osVersion
    }))
  );
  
  // Filter applications based on search term
  const filteredApplications = allApplications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count applications by name
  const appCounts = allApplications.reduce((acc, app) => {
    acc[app.name] = (acc[app.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get top 10 applications by installation count
  const topApps = Object.entries(appCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Simulate data loading and show notification
  useEffect(() => {
    console.log("Software data hook initialized");
    
    // Simulate a data loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      console.log("Software data loaded:", {
        totalApps: allApplications.length,
        topApps: topApps.length
      });
      
      toast({
        title: "Software Data Loaded",
        description: `Loaded ${allApplications.length} applications across ${devices.length} devices.`,
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return {
    searchTerm,
    setSearchTerm,
    allApplications,
    filteredApplications,
    appCounts,
    topApps,
    isLoading
  };
}
