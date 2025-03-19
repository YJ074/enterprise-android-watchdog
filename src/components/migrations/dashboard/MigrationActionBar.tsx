
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown, FileUp, History, RefreshCw, Loader2 } from "lucide-react";
import { InfoBanner } from "../../common/InfoBanner";

interface MigrationActionBarProps {
  onExportAll: () => void;
  onImport: () => void;
  onRefresh: () => void;
  onViewHistory: () => void;
  isRefreshing?: boolean;
}

export const MigrationActionBar: React.FC<MigrationActionBarProps> = ({
  onExportAll,
  onImport,
  onRefresh,
  onViewHistory,
  isRefreshing = false
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <InfoBanner
        title="Migration System"
        message="The migration system allows you to manage data transitions across your MDM platform. Use it to migrate devices, users, or settings between environments."
      />
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onExportAll}>
          <FileDown className="h-4 w-4 mr-2" />
          Export All
        </Button>
        <Button variant="outline" size="sm" onClick={onImport}>
          <FileUp className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={onViewHistory}>
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </div>
    </div>
  );
};
