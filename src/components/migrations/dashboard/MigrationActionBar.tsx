
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown, FileUp, History, RefreshCw } from "lucide-react";
import { InfoBanner } from "../../common/InfoBanner";
import { useToast } from "@/components/ui/use-toast";

export const MigrationActionBar = () => {
  const { toast } = useToast();
  
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
  
  return (
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
  );
};
