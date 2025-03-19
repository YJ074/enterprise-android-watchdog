
import React, { useEffect, useState } from 'react';
import { SoftwareHeader } from './software/SoftwareHeader';
import { TopApplicationsCard } from './software/TopApplicationsCard';
import { SoftwareStatisticsCard } from './software/SoftwareStatisticsCard';
import { ApplicationInventoryTable } from './software/ApplicationInventoryTable';
import { ComplianceAlert } from './software/ComplianceAlert';
import { useSoftwareData } from './software/useSoftwareData';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function SoftwareDashboard() {
  const { toast } = useToast();
  const [forceRender, setForceRender] = useState(0);
  const {
    searchTerm,
    setSearchTerm,
    allApplications,
    filteredApplications,
    appCounts,
    topApps,
    isLoading
  } = useSoftwareData();

  // Force a re-render on mount
  useEffect(() => {
    // Log detailed information when component mounts
    console.log('SoftwareDashboard mounting...', {
      timestamp: new Date().toISOString(),
      renderCount: forceRender,
      appCount: allApplications?.length, 
      filteredCount: filteredApplications?.length,
      hasTopApps: topApps?.length > 0,
      isLoading
    });
    
    toast({
      title: "Software Dashboard Active",
      description: "Software management interface is now visible.",
      variant: "default",
    });
    
    // This helps ensure React fully renders the component
    const timer = setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [toast, allApplications, filteredApplications, topApps, isLoading, forceRender]);

  const handleRefresh = () => {
    setForceRender(prev => prev + 1);
    toast({
      title: "Dashboard Refreshed",
      description: "Software data has been refreshed.",
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-10 text-center bg-white rounded-lg shadow-md border border-blue-100">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-blue-100 rounded w-1/3 mx-auto"></div>
          <div className="h-64 bg-blue-50 rounded"></div>
          <p className="text-muted-foreground">Loading software data...</p>
        </div>
      </div>
    );
  }

  // Show an error state if no applications are found
  if (!allApplications || allApplications.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md border border-red-100">
        <p className="text-muted-foreground mb-4">No software data available</p>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="mx-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500 bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <div className="flex justify-between items-center">
        <SoftwareHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <ComplianceAlert />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopApplicationsCard topApps={topApps} />
        <SoftwareStatisticsCard 
          allApplications={allApplications}
          appCounts={appCounts}
        />
      </div>
      
      <ApplicationInventoryTable applications={filteredApplications} />
    </div>
  );
}
