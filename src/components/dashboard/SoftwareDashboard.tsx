
import React, { useEffect } from 'react';
import { SoftwareHeader } from './software/SoftwareHeader';
import { TopApplicationsCard } from './software/TopApplicationsCard';
import { SoftwareStatisticsCard } from './software/SoftwareStatisticsCard';
import { ApplicationInventoryTable } from './software/ApplicationInventoryTable';
import { ComplianceAlert } from './software/ComplianceAlert';
import { useSoftwareData } from './software/useSoftwareData';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function SoftwareDashboard() {
  const { toast } = useToast();
  const {
    searchTerm,
    setSearchTerm,
    allApplications,
    filteredApplications,
    appCounts,
    topApps,
    isLoading
  } = useSoftwareData();

  // Log detailed information when component mounts
  useEffect(() => {
    console.log('SoftwareDashboard mounting...', {
      timestamp: new Date().toISOString(),
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
  }, [toast]);

  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    window.location.reload();
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-8 space-y-6 bg-white rounded-lg shadow-md border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="w-64">
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
        
        <Skeleton className="h-16 w-full" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        
        <Skeleton className="h-72 w-full" />
        
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-blue-500 font-medium">Loading software data...</span>
        </div>
      </div>
    );
  }

  // Show fallback for no data
  if (!allApplications || allApplications.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md border border-red-100">
        <p className="text-red-500 font-medium mb-4">No software data available</p>
        <p className="text-muted-foreground mb-4">
          There was an issue loading the software inventory data. Please try refreshing.
        </p>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="mx-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div id="software-dashboard" className="space-y-6 animate-in fade-in-50 duration-300 bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
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
