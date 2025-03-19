
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Migration } from '@/lib/api/migration/migrationService';

interface MigrationDetailCardsProps {
  migration: Migration;
}

export const MigrationDetailCards: React.FC<MigrationDetailCardsProps> = ({ migration }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Migration Details</h3>
        <div className="bg-muted/20 p-3 rounded-md space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Type:</span>
            <span className="text-sm font-medium capitalize">{migration.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Created:</span>
            <span className="text-sm">
              {formatDistanceToNow(new Date(migration.createdAt), { addSuffix: true })}
            </span>
          </div>
          {migration.startedAt && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Started:</span>
              <span className="text-sm">
                {formatDistanceToNow(new Date(migration.startedAt), { addSuffix: true })}
              </span>
            </div>
          )}
          {migration.completedAt && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Completed:</span>
              <span className="text-sm">
                {formatDistanceToNow(new Date(migration.completedAt), { addSuffix: true })}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Created By:</span>
            <span className="text-sm">{migration.createdBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Record Count:</span>
            <span className="text-sm font-medium">{migration.recordCount}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Environment Information</h3>
        <div className="bg-muted/20 p-3 rounded-md space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Source:</span>
            <span className="text-sm font-medium capitalize">{migration.source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Destination:</span>
            <span className="text-sm font-medium capitalize">{migration.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Include Attachments:</span>
            <span className="text-sm">{migration.includeAttachments ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Include Historical Data:</span>
            <span className="text-sm">{migration.includeHistoricalData ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
