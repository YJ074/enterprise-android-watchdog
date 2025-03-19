
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
  const [applications, setApplications] = useState<ApplicationWithDevice[]>([]);
  const { toast } = useToast();
  
  // Initialize data
  useEffect(() => {
    console.log("Software data hook initializing with devices:", devices.length);
    
    if (!devices || devices.length === 0) {
      console.error("No devices data available");
      setIsLoading(false);
      return;
    }
    
    try {
      // Extract all applications from all devices
      const allApps = devices.flatMap(device => 
        device.applications.map(app => ({
          ...app,
          deviceName: device.name,
          deviceModel: device.model,
          deviceOS: device.osVersion
        }))
      );
      
      console.log("Prepared applications data:", allApps.length);
      
      // Set applications with slight delay to ensure rendering
      const timer = setTimeout(() => {
        console.log("Setting applications data:", allApps.length);
        setApplications(allApps);
        setIsLoading(false);
        setInitialized(true);
        
        toast({
          title: "Software Data Loaded",
          description: `Loaded ${allApps.length} applications across ${devices.length} devices.`,
        });
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error processing software data:", error);
      setIsLoading(false);
      setInitialized(true);
      
      toast({
        title: "Data Loading Error",
        description: "There was a problem loading software data. Please refresh.",
        variant: "destructive",
      });
    }
  }, [toast]); // Only run on mount
  
  // Get all applications
  const allApplications = applications;
  
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

  // Log whenever filtered results change
  useEffect(() => {
    if (initialized) {
      console.log("Search results updated:", {
        searchTerm,
        resultCount: filteredApplications.length,
        initialized
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
