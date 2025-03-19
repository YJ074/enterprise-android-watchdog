
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MigrationsList } from './MigrationsList';
import { MigrationExecutor } from './MigrationExecutor';
import { MigrationCreator } from './MigrationCreator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InfoBanner } from "../common/InfoBanner";
import { MigrationStats } from './MigrationStats';
import { Button } from "@/components/ui/button";
import { FileDown, FileUp, History, RefreshCw, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { migrationService } from "@/lib/api/migration/migrationService";
import { useNavigate } from 'react-router-dom';

export const MigrationDashboard = () => {
  const [activeTab, setActiveTab] = useState('migrations');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleExportAll = () => {
    toast({
      title: "Export Started",
      description: "Exporting all migrations as a backup archive.",
    });
  };

  const handleImportAll = () => {
    toast({
      title: "Import",
      description: "Please select a migration archive to import.",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Refreshing migration status from all systems.",
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Migration History",
      description: "Viewing detailed migration history and audit logs.",
    });
  };
  
  const handleGoToDevices = () => {
    navigate('/devices');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Migrations</h1>
          <Button variant="outline" size="sm" onClick={handleGoToDevices}>
            <Home className="h-4 w-4 mr-2" />
            Back to Devices
          </Button>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/devices">Devices</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Migrations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <InfoBanner
          title="Migration System"
          message="The migration system allows you to manage data transitions across your MDM platform. Use it to migrate devices, users, or settings between environments."
        />
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportAll}>
            <FileDown className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportAll}>
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewHistory}>
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </div>
      </div>

      <MigrationStats />

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="migrations">Migrations</TabsTrigger>
          <TabsTrigger value="execute">Execute Migration</TabsTrigger>
          <TabsTrigger value="create">Create Migration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="migrations" className="space-y-4">
          <MigrationsList />
        </TabsContent>
        
        <TabsContent value="execute" className="space-y-4">
          <MigrationExecutor />
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <MigrationCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
