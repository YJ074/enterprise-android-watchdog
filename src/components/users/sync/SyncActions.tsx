
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface SyncActionsProps {
  syncing: boolean;
  onSyncNow: () => void;
  onSaveSettings: () => void;
}

export function SyncActions({ syncing, onSyncNow, onSaveSettings }: SyncActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <Button 
        onClick={onSyncNow} 
        disabled={syncing}
        className="gap-2"
      >
        {syncing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4" />
            Sync Now
          </>
        )}
      </Button>
      <Button 
        variant="outline" 
        onClick={onSaveSettings}
      >
        Save Settings
      </Button>
    </div>
  );
}
