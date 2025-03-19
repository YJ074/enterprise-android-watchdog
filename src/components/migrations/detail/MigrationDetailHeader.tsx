
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, RefreshCw, FileDown, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MigrationDetailHeaderProps {
  isPending: boolean;
  onBack: () => void;
  onExecute?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
}

export const MigrationDetailHeader: React.FC<MigrationDetailHeaderProps> = ({
  isPending,
  onBack,
  onExecute,
  onRefresh,
  onExport
}) => {
  const navigate = useNavigate();
  
  const handleGoToDevices = () => {
    navigate('/devices');
  };
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Migrations
        </Button>
        <Button variant="outline" size="sm" onClick={handleGoToDevices}>
          <Home className="h-4 w-4 mr-2" />
          Devices Dashboard
        </Button>
      </div>
      <div className="flex gap-2">
        {isPending && (
          <Button size="sm" onClick={onExecute}>
            <Play className="h-4 w-4 mr-2" />
            Execute
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
