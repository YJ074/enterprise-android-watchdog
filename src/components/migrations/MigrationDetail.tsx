
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Migration } from '@/lib/api/migration/migrationService';
import { MigrationDetailHeader } from './detail/MigrationDetailHeader';
import { MigrationStatusBadge } from './detail/MigrationStatusBadge';
import { MigrationProgressBar } from './detail/MigrationProgressBar';
import { MigrationDetailCards } from './detail/MigrationDetailCards';
import { MigrationLogs } from './detail/MigrationLogs';
import { MigrationDetailFooter } from './detail/MigrationDetailFooter';

interface MigrationDetailProps {
  migration: Migration;
  onBack: () => void;
  onExecute?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
}

export const MigrationDetail = ({
  migration,
  onBack,
  onExecute,
  onRefresh,
  onExport
}: MigrationDetailProps) => {
  const isPending = migration.status === 'pending';
  const isInProgress = migration.status === 'in-progress';
  const isCompleted = migration.status === 'completed';
  const isFailed = migration.status === 'failed';
  
  const handleViewFullLogs = () => {
    // Implement full logs viewing functionality
    console.log('View full logs for migration:', migration.id);
  };
  
  return (
    <div className="space-y-6">
      <MigrationDetailHeader 
        isPending={isPending}
        onBack={onBack}
        onExecute={onExecute}
        onRefresh={onRefresh}
        onExport={onExport}
      />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{migration.name}</CardTitle>
              <CardDescription>{migration.description || 'No description provided'}</CardDescription>
            </div>
            <MigrationStatusBadge status={migration.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <MigrationProgressBar isInProgress={isInProgress} />
          
          <MigrationDetailCards migration={migration} />
          
          <Separator />
          
          <MigrationLogs logs={migration.logs} />
        </CardContent>
        
        <CardFooter>
          <MigrationDetailFooter 
            isCompleted={isCompleted}
            isFailed={isFailed}
            onViewFullLogs={handleViewFullLogs}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
