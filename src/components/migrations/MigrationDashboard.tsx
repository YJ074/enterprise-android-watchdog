
import React, { useState, useEffect } from 'react';
import { MigrationHeader } from './dashboard/MigrationHeader';
import { MigrationActionBar } from './dashboard/MigrationActionBar';
import { MigrationStats } from './MigrationStats';
import { MigrationTabs } from './dashboard/MigrationTabs';
import { useToast } from "@/components/ui/use-toast";
import { useMigrations } from '@/hooks/useMigrations';

export const MigrationDashboard = () => {
  const [activeTab, setActiveTab] = useState('migrations');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { 
    migrations, 
    fetchMigrations, 
    executeMigration, 
    deleteMigration, 
    createMigration,
    isLoading
  } = useMigrations();
  
  // Simulate initial data loading
  useEffect(() => {
    fetchMigrations();
  }, [fetchMigrations]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchMigrations();
    setIsRefreshing(false);
    
    toast({
      title: "Refreshed",
      description: "Migration data has been refreshed.",
    });
  };
  
  const handleExportAll = () => {
    toast({
      title: "Export Started",
      description: "Exporting all migrations as a backup archive.",
    });
    
    // Simulate export process
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify(migrations, null, 2)
      );
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "migrations-export.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      toast({
        title: "Export Complete",
        description: "All migration data has been exported successfully.",
      });
    }, 1000);
  };
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target?.result as string);
          
          toast({
            title: "Import Successful",
            description: `Imported ${importedData.length} migrations.`,
          });
          
          // In a real app, you'd process the imported data and add it to your state/database
          fetchMigrations(); // Refresh the list after import
        } catch (error) {
          toast({
            title: "Import Failed",
            description: "Could not parse the imported file.",
            variant: "destructive",
          });
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  const handleViewHistory = () => {
    toast({
      title: "History View",
      description: "Viewing detailed migration history and audit logs.",
    });
    
    // In a real app, this would open a detailed history view or navigate to a history page
    window.open('/migration-history', '_blank');
  };
  
  return (
    <div className="space-y-6">
      <MigrationHeader />
      
      <MigrationActionBar 
        onExportAll={handleExportAll}
        onImport={handleImport}
        onRefresh={handleRefresh}
        onViewHistory={handleViewHistory}
        isRefreshing={isRefreshing}
      />
      
      <MigrationStats 
        migrations={migrations}
        isLoading={isLoading}
      />
      
      <MigrationTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        migrations={migrations}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        onExecuteMigration={executeMigration}
        onDeleteMigration={deleteMigration}
      />
    </div>
  );
};
