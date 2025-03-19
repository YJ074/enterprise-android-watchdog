
import React from 'react';
import { format } from 'date-fns';
import { MigrationLog } from '@/lib/api/migration/migrationService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface MigrationLogsProps {
  logs?: MigrationLog[];
}

export const MigrationLogs: React.FC<MigrationLogsProps> = ({ logs }) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Migration Logs</h3>
      {logs && logs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-xs">
                  {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      log.level === 'error' ? 'destructive' : 
                      log.level === 'warning' ? 'secondary' : 
                      'outline'
                    }
                    className="capitalize text-xs"
                  >
                    {log.level}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No logs available for this migration
        </div>
      )}
    </div>
  );
};
