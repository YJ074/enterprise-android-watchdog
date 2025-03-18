
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Users } from "lucide-react";
import { SyncSources } from "./sync/SyncSources";
import { ApiSourceConfig } from "./sync/ApiSourceConfig";
import { CsvSourceConfig } from "./sync/CsvSourceConfig";
import { AutoSyncConfig } from "./sync/AutoSyncConfig";
import { SyncActions } from "./sync/SyncActions";

export function UserSync() {
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [syncSource, setSyncSource] = useState("ldap");
  const [syncInterval, setSyncInterval] = useState("daily");
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleSyncNow = () => {
    setSyncing(true);
    
    // Simulate API call to sync users
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date());
      
      toast({
        title: "User Synchronization Complete",
        description: `Successfully synchronized users from ${syncSource.toUpperCase()}.`,
      });
    }, 1000);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Sync Settings Saved",
      description: "Your user synchronization settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>User Synchronization</span>
        </CardTitle>
        <CardDescription>
          Configure how users are synchronized with external systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <SyncSources 
            syncSource={syncSource} 
            setSyncSource={setSyncSource} 
          />

          {syncSource === "api" && (
            <ApiSourceConfig
              webhookUrl={webhookUrl}
              setWebhookUrl={setWebhookUrl}
            />
          )}

          {syncSource === "csv" && (
            <CsvSourceConfig />
          )}

          <AutoSyncConfig
            autoSync={autoSync}
            setAutoSync={setAutoSync}
            syncInterval={syncInterval}
            setSyncInterval={setSyncInterval}
          />

          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Last Synchronization</Label>
              <span className="text-sm">
                {lastSync 
                  ? lastSync.toLocaleString() 
                  : "Never synchronized"}
              </span>
            </div>
          </div>
        </div>
        
        <SyncActions
          syncing={syncing}
          onSyncNow={handleSyncNow}
          onSaveSettings={handleSaveSettings}
        />
      </CardContent>
    </Card>
  );
}
