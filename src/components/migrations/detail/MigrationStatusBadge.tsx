
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MigrationStatus } from '@/lib/api/migration/migrationService';

interface MigrationStatusBadgeProps {
  status: MigrationStatus;
}

export const MigrationStatusBadge: React.FC<MigrationStatusBadgeProps> = ({ status }) => {
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';
  const isInProgress = status === 'in-progress';
  
  return (
    <Badge 
      variant={
        isCompleted ? 'success' : 
        isFailed ? 'destructive' : 
        isInProgress ? 'default' : 
        'secondary'
      }
      className="capitalize"
    >
      {status}
    </Badge>
  );
};
