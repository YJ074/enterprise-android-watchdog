
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
  const [initialized, setInitialized] = useState(false);
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

  // Initialize data with logging
  useEffect(() => {
    console.log("Software data hook initializing...");
    
    // Simulate a data loading delay - this helps ensure components mount properly
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialized(true);
      
      console.log("Software data loaded successfully:", {
        timestamp: new Date().toISOString(),
        totalApps: allApplications.length,
        uniqueApps: Object.keys(appCounts).length,
        topAppCount: topApps.length,
        deviceCount: devices.length
      });
      
      toast({
        title: "Software Data Loaded",
        description: `Loaded ${allApplications.length} applications across ${devices.length} devices.`,
      });
    }, 800); // Slightly longer delay to ensure UI is ready
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Log whenever filtered results change
  useEffect(() => {
    if (initialized) {
      console.log("Search results updated:", {
        searchTerm,
        resultCount: filteredApplications.length
      });
    }
  }, [searchTerm, filteredApplications.length, initialized]);

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
