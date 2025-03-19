
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Migration } from '@/lib/api/migration/migrationService';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { MigrationStatusBadge } from './detail/MigrationStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Play, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import {
  Alert,
  AlertDescription
} from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface MigrationExecutorProps {
  migrations: Migration[];
  onExecuteMigration: (id: string) => Promise<boolean>;
}

export const MigrationExecutor: React.FC<MigrationExecutorProps> = ({ 
  migrations,
  onExecuteMigration 
}) => {
  const [selectedMigration, setSelectedMigration] = useState<string>('');
  const [options, setOptions] = useState({
    dryRun: false,
    backup: true,
    priority: 'normal'
  });
  const [executing, setExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionSuccess, setExecutionSuccess] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  const pendingMigrations = migrations.filter(migration => migration.status === 'pending');
  const selectedMigrationData = migrations.find(m => m.id === selectedMigration);
  
  const handleOptionChange = (option: string, value: any) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };
  
  const handleExecute = async () => {
    if (!selectedMigration) {
      toast({
        title: "No Migration Selected",
        description: "Please select a migration to execute.",
        variant: "destructive",
      });
      return;
    }
    
    setExecuting(true);
    setExecutionProgress(0);
    setExecutionSuccess(null);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setExecutionProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 500);
    
    try {
      const success = await onExecuteMigration(selectedMigration);
      
      // Complete the progress
      clearInterval(progressInterval);
      setExecutionProgress(100);
      setExecutionSuccess(success);
      
      if (success) {
        toast({
          title: "Migration Executed Successfully",
          description: `The migration has been executed with${options.dryRun ? ' dry run enabled.' : 'out issues.'}`,
        });
      } else {
        toast({
          title: "Migration Execution Failed",
          description: "There was an error executing the migration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      clearInterval(progressInterval);
      setExecutionSuccess(false);
      toast({
        title: "Execution Error",
        description: "An unexpected error occurred during migration execution.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setExecuting(false);
      }, 1000);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Execute Migration</CardTitle>
        <CardDescription>
          Run pending migrations with custom execution parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {pendingMigrations.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No pending migrations available for execution.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select Migration</label>
            <Select 
              value={selectedMigration} 
              onValueChange={setSelectedMigration}
              disabled={pendingMigrations.length === 0 || executing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a migration to execute" />
              </SelectTrigger>
              <SelectContent>
                {pendingMigrations.map((migration) => (
                  <SelectItem key={migration.id} value={migration.id}>
                    {migration.name} ({migration.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedMigrationData && (
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Migration Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p>{selectedMigrationData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge variant="outline" className="capitalize">
                    {selectedMigrationData.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <MigrationStatusBadge status={selectedMigrationData.status} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p>{formatDistanceToNow(new Date(selectedMigrationData.createdAt), { addSuffix: true })}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Record Count</p>
                  <p>{selectedMigrationData.recordCount}</p>
                </div>
              </div>
            </div>
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Execution Options</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dry-run" 
                      checked={options.dryRun}
                      onCheckedChange={(checked) => 
                        handleOptionChange('dryRun', !!checked)
                      }
                      disabled={executing}
                    />
                    <label
                      htmlFor="dry-run"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Dry Run
                    </label>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {options.dryRun 
                      ? "Enabled - Only simulate migration without making changes" 
                      : "Disabled - Will execute real migration"
                    }
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="backup" 
                      checked={options.backup}
                      onCheckedChange={(checked) => 
                        handleOptionChange('backup', !!checked)
                      }
                      disabled={executing}
                    />
                    <label
                      htmlFor="backup"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Create Backup
                    </label>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {options.backup 
                      ? "Enabled - Create data backup before migration" 
                      : "Disabled - No backup will be created"
                    }
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <label
                    htmlFor="priority"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Priority Level
                  </label>
                </TableCell>
                <TableCell>
                  <Select 
                    value={options.priority} 
                    onValueChange={(value) => handleOptionChange('priority', value)}
                    disabled={executing}
                  >
                    <SelectTrigger id="priority" className="w-[180px]">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          {executing && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Executing migration...</span>
                <span className="text-sm">{executionProgress}%</span>
              </div>
              <Progress value={executionProgress} />
            </div>
          )}
          
          {executionSuccess === true && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Migration executed successfully!
              </AlertDescription>
            </Alert>
          )}
          
          {executionSuccess === false && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Migration execution failed. Please check the logs for details.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={handleExecute} 
              disabled={!selectedMigration || executing || pendingMigrations.length === 0}
              className="gap-2"
            >
              {executing ? (
                <>Running...</>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Execute Migration
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
