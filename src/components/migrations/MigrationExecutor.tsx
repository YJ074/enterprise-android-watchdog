
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Play, FileUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

export const MigrationExecutor = () => {
  const [selectedMigration, setSelectedMigration] = useState('');
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleExecute = () => {
    if (!selectedMigration) {
      toast({
        title: "Error",
        description: "Please select a migration to execute",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call to start the migration
    setMigrationStatus('running');
    setProgress(0);

    // Simulate a migration running
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setMigrationStatus('completed');
          toast({
            title: "Migration Completed",
            description: "The migration has been successfully executed.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const handleImport = () => {
    toast({
      title: "Import Migration",
      description: "Migration file upload would be handled here.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execute Migration</CardTitle>
        <CardDescription>
          Run a pending migration or import a new migration file.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {migrationStatus === 'running' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Migration in progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {migrationStatus === 'completed' && (
          <Alert variant="success">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Migration has been successfully completed.
            </AlertDescription>
          </Alert>
        )}

        {migrationStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error executing the migration. Please check the logs.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Select value={selectedMigration} onValueChange={setSelectedMigration} disabled={migrationStatus === 'running'}>
              <SelectTrigger>
                <SelectValue placeholder="Select a migration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mig-002">User Profiles Migration</SelectItem>
                <SelectItem value="other-pending">Other Pending Migration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={handleExecute} 
              disabled={!selectedMigration || migrationStatus === 'running'}
            >
              <Play className="h-4 w-4 mr-2" />
              Execute
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleImport} 
              disabled={migrationStatus === 'running'}
            >
              <FileUp className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
