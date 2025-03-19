
import React from 'react';
import { SoftwareHeader } from './software/SoftwareHeader';
import { TopApplicationsCard } from './software/TopApplicationsCard';
import { SoftwareStatisticsCard } from './software/SoftwareStatisticsCard';
import { ApplicationInventoryTable } from './software/ApplicationInventoryTable';
import { ComplianceAlert } from './software/ComplianceAlert';
import { useSoftwareData } from './software/useSoftwareData';

export function SoftwareDashboard() {
  const {
    searchTerm,
    setSearchTerm,
    allApplications,
    filteredApplications,
    appCounts,
    topApps
  } = useSoftwareData();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <SoftwareHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopApplicationsCard topApps={topApps} />
        <SoftwareStatisticsCard 
          allApplications={allApplications}
          appCounts={appCounts}
        />
      </div>
      
      <ApplicationInventoryTable applications={filteredApplications} />
      
      <ComplianceAlert />
    </div>
  );
}
