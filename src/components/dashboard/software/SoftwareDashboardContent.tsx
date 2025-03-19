
import React from 'react';
import { TopApplicationsCard } from './TopApplicationsCard';
import { SoftwareStatisticsCard } from './SoftwareStatisticsCard';
import { ApplicationInventoryTable } from './ApplicationInventoryTable';
import { ComplianceAlert } from './ComplianceAlert';
import { Application } from '@/lib/types/device.types';

interface SoftwareDashboardContentProps {
  allApplications: Application[];
  filteredApplications: any[];
  appCounts: Record<string, number>;
  topApps: [string, number][];
}

export function SoftwareDashboardContent({
  allApplications,
  filteredApplications,
  appCounts,
  topApps
}: SoftwareDashboardContentProps) {
  return (
    <>
      <ComplianceAlert />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopApplicationsCard topApps={topApps} />
        <SoftwareStatisticsCard 
          allApplications={allApplications}
          appCounts={appCounts}
        />
      </div>
      
      <ApplicationInventoryTable applications={filteredApplications} />
    </>
  );
}
