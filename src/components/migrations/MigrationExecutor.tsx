
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Play, FileUp, Database, Clock, Server, CloudOff, Cloud, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const MigrationExecutor = () => {
  const [selectedMigration, setSelectedMigration] = useState('');
  const [migrationMode, setMigrationMode] = useState('standard');
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [validationMode, setValidationMode] = useState('basic');
  const [logLevel, setLogLevel] = useState('info');
  const [backupBeforeMigration, setBackupBeforeMigration] = useState(true);
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

  const SystemEnvironment = ({ name, type, status }: { name: string; type: string; status: 'online' | 'offline' }) => (
    <div className="flex items-center justify-between p-2 border rounded-md">
      <div className="flex items-center gap-2">
        {type === 'cloud' ? 
          <Cloud className="h-4 w-4 text-blue-500" /> : 
          <Server className="h-4 w-4 text-gray-500" />
        }
        <span>{name}</span>
      </div>
      <Badge variant={status === 'online' ? 'success' : 'destructive'}>
        {status === 'online' ? 'Online' : 'Offline'}
      </Badge>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execute Migration</CardTitle>
        <CardDescription>
          Run a pending migration, import a new migration file, or manage environments.
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

        <Tabs defaultValue="standard" value={migrationMode} onValueChange={setMigrationMode}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="environments">Environments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Select value={selectedMigration} onValueChange={setSelectedMigration} disabled={migrationStatus === 'running'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a migration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mig-002">User Profiles Migration</SelectItem>
                    <SelectItem value="mig-005">Device Configuration Migration</SelectItem>
                    <SelectItem value="mig-006">Security Policies Migration</SelectItem>
                    <SelectItem value="mig-007">Application Settings Migration</SelectItem>
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
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="backup-before" 
                checked={backupBeforeMigration}
                onCheckedChange={(checked) => setBackupBeforeMigration(!!checked)}
              />
              <Label htmlFor="backup-before">Create backup before migration</Label>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Validation Mode</Label>
                <Select value={validationMode} onValueChange={setValidationMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select validation mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Validation</SelectItem>
                    <SelectItem value="strict">Strict Validation</SelectItem>
                    <SelectItem value="custom">Custom Rules</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Log Level</Label>
                <Select value={logLevel} onValueChange={setLogLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="verbose">Verbose</SelectItem>
                    <SelectItem value="warning">Warning & Above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Execution Priority</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Database
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Server className="h-4 w-4 mr-2" />
                  Services
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Timeout (minutes)</Label>
              <Input type="number" defaultValue="30" min="1" max="120" />
            </div>
            
            <div className="space-y-2">
              <Label>Retry Strategy</Label>
              <Select defaultValue="exponential">
                <SelectTrigger>
                  <SelectValue placeholder="Select retry strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Retry</SelectItem>
                  <SelectItem value="linear">Linear Backoff</SelectItem>
                  <SelectItem value="exponential">Exponential Backoff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="environments" className="space-y-4">
            <div className="space-y-1">
              <Label>Source Environment</Label>
              <div className="space-y-2 mt-1">
                <SystemEnvironment name="Production" type="cloud" status="online" />
                <SystemEnvironment name="Staging" type="cloud" status="online" />
                <SystemEnvironment name="Development" type="server" status="online" />
                <SystemEnvironment name="Legacy System" type="server" status="offline" />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label>Destination Environment</Label>
              <div className="space-y-2 mt-1">
                <SystemEnvironment name="Production" type="cloud" status="online" />
                <SystemEnvironment name="Staging" type="cloud" status="online" />
                <SystemEnvironment name="Development" type="server" status="online" />
                <SystemEnvironment name="Archive Storage" type="cloud" status="online" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="connection-test" defaultChecked />
              <Label htmlFor="connection-test">Test connections before migration</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between bg-muted/10 p-4 border-t">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Estimated time: 5-10 minutes</span>
        </div>
        <Button variant="outline" size="sm">View Logs</Button>
      </CardFooter>
    </Card>
  );
};
