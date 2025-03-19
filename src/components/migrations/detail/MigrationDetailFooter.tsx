
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface MigrationDetailFooterProps {
  isCompleted: boolean;
  isFailed: boolean;
  onViewFullLogs?: () => void;
}

export const MigrationDetailFooter: React.FC<MigrationDetailFooterProps> = ({
  isCompleted,
  isFailed,
  onViewFullLogs
}) => {
  return (
    <div className="flex justify-between bg-muted/10 p-4 border-t">
      {isFailed ? (
        <div className="flex items-center text-destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span className="text-sm">This migration failed and may require manual intervention</span>
        </div>
      ) : isCompleted ? (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span className="text-sm">Migration completed successfully</span>
        </div>
      ) : (
        <div></div>
      )}
      
      <Button variant="outline" size="sm" onClick={onViewFullLogs}>View Full Logs</Button>
    </div>
  );
};
