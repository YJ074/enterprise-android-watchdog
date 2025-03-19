import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileDown, Play, RefreshCw, ArrowLeft, AlertTriangle, CheckCircle, Home } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Migration, MigrationLog } from '@/lib/api/migration/migrationService';
import { format, formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const handleGoToDevices = () => {
    navigate('/devices');
  };
  
  return (
    <div className="space-y-6">
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
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{migration.name}</CardTitle>
              <CardDescription>{migration.description || 'No description provided'}</CardDescription>
            </div>
            <Badge 
              variant={
                isCompleted ? 'success' : 
                isFailed ? 'destructive' : 
                isInProgress ? 'default' : 
                'secondary'
              }
              className="capitalize"
            >
              {migration.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isInProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Migration in progress</span>
                <span>63%</span>
              </div>
              <Progress value={63} className="h-2" />
            </div>
          )}
          
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
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Migration Logs</h3>
            {migration.logs && migration.logs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {migration.logs.map((log) => (
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
        </CardContent>
        
        <CardFooter className="flex justify-between bg-muted/10 p-4 border-t">
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
          
          <Button variant="outline" size="sm">View Full Logs</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
