
import React, { useEffect } from 'react';
import { SoftwareHeader } from './software/SoftwareHeader';
import { TopApplicationsCard } from './software/TopApplicationsCard';
import { SoftwareStatisticsCard } from './software/SoftwareStatisticsCard';
import { ApplicationInventoryTable } from './software/ApplicationInventoryTable';
import { ComplianceAlert } from './software/ComplianceAlert';
import { useSoftwareData } from './software/useSoftwareData';
import { useToast } from "@/components/ui/use-toast";

export function SoftwareDashboard() {
  const { toast } = useToast();
  const {
    searchTerm,
    setSearchTerm,
    allApplications,
    filteredApplications,
    appCounts,
    topApps
  } = useSoftwareData();

  // Add an effect to notify when the dashboard is rendered
  useEffect(() => {
    // Log when component mounts to help with debugging
    console.log('SoftwareDashboard rendered with data:', {
      appCount: allApplications?.length, 
      filteredCount: filteredApplications?.length,
      hasTopApps: topApps?.length > 0
    });
    
    toast({
      title: "Software Dashboard Active",
      description: "Software management interface is now visible.",
      variant: "default",
    });
  }, [toast, allApplications, filteredApplications, topApps]);

  // Ensure we have data before rendering
  if (!allApplications || allApplications.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow">
        <p className="text-muted-foreground">Loading software data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500 bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <SoftwareHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
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
