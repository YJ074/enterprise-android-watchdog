
import React from 'react';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';
import { LogsTable } from './LogsTable';
import { DeviceInfoBanner } from './DeviceInfoBanner';

interface InvestigationResultsProps {
  logs: InvestigationLog[];
  isLoading: boolean;
  deviceId?: string;
}

export const InvestigationResults: React.FC<InvestigationResultsProps> = ({
  logs,
  isLoading,
  deviceId,
}) => {
  if (isLoading) {
    return <div className="py-8 text-center">Loading investigation results...</div>;
  }

  return (
    <div className="space-y-4">
      {deviceId && <DeviceInfoBanner deviceId={deviceId} />}
      
      {logs.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No logs found matching your search criteria.
        </div>
      ) : (
        <LogsTable logs={logs} />
      )}
    </div>
  );
};

