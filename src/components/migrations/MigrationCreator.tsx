
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MigrationCreator = () => {
  const [migrationName, setMigrationName] = useState('');
  const [migrationType, setMigrationType] = useState('');
  const [description, setDescription] = useState('');
  const [includeAttachments, setIncludeAttachments] = useState(false);
  const [includeHistoricalData, setIncludeHistoricalData] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [migrationMethod, setMigrationMethod] = useState('standard');
  const { toast } = useToast();

  const handleCreateMigration = () => {
    if (!migrationName || !migrationType || !source || !destination) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would call an API to create the migration
    toast({
      title: "Migration Created",
      description: `${migrationName} has been created successfully.`,
    });

    // Reset form
    setMigrationName('');
    setMigrationType('');
    setDescription('');
    setIncludeAttachments(false);
    setIncludeHistoricalData(false);
    setSource('');
    setDestination('');
    setMigrationMethod('standard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Migration</CardTitle>
        <CardDescription>
          Define a new data migration process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard" value={migrationMethod} onValueChange={setMigrationMethod}>
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Standard Migration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="migration-name">Migration Name *</Label>
                <Input 
                  id="migration-name" 
                  value={migrationName}
                  onChange={(e) => setMigrationName(e.target.value)}
                  placeholder="e.g., Device Data Migration" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="migration-type">Migration Type *</Label>
                <Select value={migrationType} onValueChange={setMigrationType}>
                  <SelectTrigger id="migration-type">
                    <SelectValue placeholder="Select migration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="device">Device Data</SelectItem>
                    <SelectItem value="user">User Profiles</SelectItem>
                    <SelectItem value="policy">Policies</SelectItem>
                    <SelectItem value="settings">Settings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose of this migration"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source *</Label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production Environment</SelectItem>
                    <SelectItem value="staging">Staging Environment</SelectItem>
                    <SelectItem value="development">Development Environment</SelectItem>
                    <SelectItem value="legacy">Legacy System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production Environment</SelectItem>
                    <SelectItem value="staging">Staging Environment</SelectItem>
                    <SelectItem value="development">Development Environment</SelectItem>
                    <SelectItem value="backup">Backup System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-attachments" 
                  checked={includeAttachments}
                  onCheckedChange={(checked) => setIncludeAttachments(!!checked)}
                />
                <Label htmlFor="include-attachments">Include attachments and binary data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-historical" 
                  checked={includeHistoricalData}
                  onCheckedChange={(checked) => setIncludeHistoricalData(!!checked)}
                />
                <Label htmlFor="include-historical">Include historical data and logs</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="advanced-config">Advanced Configuration</Label>
              <Textarea 
                id="advanced-config"
                placeholder="JSON configuration for advanced migration settings"
                rows={10}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transformation-rules">Data Transformation Rules</Label>
              <Textarea 
                id="transformation-rules"
                placeholder="Define transformation rules for migrating data"
                rows={5}
                className="font-mono text-sm"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button variant="outline" className="mr-2">Cancel</Button>
          <Button onClick={handleCreateMigration}>Create Migration</Button>
        </div>
      </CardContent>
    </Card>
  );
};
