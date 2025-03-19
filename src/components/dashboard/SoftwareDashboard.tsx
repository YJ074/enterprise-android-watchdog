
import React, { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useSoftwareData } from './software/useSoftwareData';
import { SoftwareDashboardLoading } from './software/SoftwareDashboardLoading';
import { SoftwareDashboardError } from './software/SoftwareDashboardError';
import { SoftwareDashboardHeader } from './software/SoftwareDashboardHeader';
import { SoftwareDashboardContent } from './software/SoftwareDashboardContent';

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
    return <SoftwareDashboardLoading />;
  }

  // Show fallback for no data
  if (!allApplications || allApplications.length === 0) {
    return <SoftwareDashboardError onRefresh={handleRefresh} />;
  }

  return (
    <div 
      id="software-dashboard" 
      className="space-y-6 animate-in fade-in-50 duration-300 bg-white p-4 md:p-6 rounded-lg shadow-lg border-2 border-blue-200 max-w-full overflow-hidden"
    >
      <SoftwareDashboardHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={handleRefresh}
      />
      
      <SoftwareDashboardContent
        allApplications={allApplications}
        filteredApplications={filteredApplications}
        appCounts={appCounts}
        topApps={topApps}
      />
    </div>
  );
}
