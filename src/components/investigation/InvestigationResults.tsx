
import React from 'react';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';
import { LogsTable } from './LogsTable';
import { DeviceInfoBanner } from './DeviceInfoBanner';
import { useDevice } from '@/hooks/useDevices';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, PackageOpen } from 'lucide-react';

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
  // Fetch device data using the deviceId
  const { device } = useDevice(deviceId);

  if (isLoading) {
    return <div className="py-8 text-center">Loading investigation results...</div>;
  }

  return (
    <div className="space-y-4">
      {device && <DeviceInfoBanner device={device} />}
      
      {logs.length === 0 ? (
        <div className="py-8 text-center">
          <div className="text-muted-foreground mb-4">
            No logs found matching your search criteria.
          </div>
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild>
              <Link to="/">
                <PackageOpen className="h-4 w-4 mr-2" />
                Software Dashboard
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <LogsTable logs={logs} />
      )}
    </div>
  );
}
