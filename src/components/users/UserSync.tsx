
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle, Shield, Users } from "lucide-react";
import { SyncSources } from "./sync/SyncSources";
import { ApiSourceConfig } from "./sync/ApiSourceConfig";
import { CsvSourceConfig } from "./sync/CsvSourceConfig";
import { AutoSyncConfig } from "./sync/AutoSyncConfig";
import { SyncActions } from "./sync/SyncActions";
import { ScimSourceConfig } from "./sync/ScimSourceConfig";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function UserSync() {
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [syncSource, setSyncSource] = useState("ldap");
  const [syncInterval, setSyncInterval] = useState("daily");
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null);

  const handleSyncNow = () => {
    setSyncing(true);
    setSyncSuccess(null);
    
    // Simulate API call to sync users
    setTimeout(() => {
      setSyncing(false);
      setLastSync(new Date());
      setSyncSuccess(true);
      
      toast({
        title: "User Synchronization Complete",
        description: `Successfully synchronized users from ${syncSource.toUpperCase()}.`,
        variant: "success",
      });
    }, 2000);
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
        {syncSuccess === true && (
          <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sync Successful</AlertTitle>
            <AlertDescription>
              User data was successfully synchronized with {syncSource.toUpperCase()}.
              {lastSync && ` Last sync: ${lastSync.toLocaleString()}`}
            </AlertDescription>
          </Alert>
        )}
        
        {syncSuccess === false && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Sync Failed</AlertTitle>
            <AlertDescription>
              There was an error synchronizing with {syncSource.toUpperCase()}.
              Please check your connection settings and try again.
            </AlertDescription>
          </Alert>
        )}

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
          
          {syncSource === "scim" && (
            <ScimSourceConfig />
          )}

          {/* Show a compliance notice for enterprise identity providers */}
          {(syncSource === "azure" || syncSource === "okta" || syncSource === "onelogin" || syncSource === "jumpcloud") && (
            <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <Shield className="h-4 w-4 text-blue-800" />
              <AlertTitle>Enterprise Compliance</AlertTitle>
              <AlertDescription>
                Syncing with {syncSource === "azure" ? "Azure AD" : syncSource} enables enterprise compliance features.
                User attributes from your identity provider will be automatically mapped to our system.
              </AlertDescription>
            </Alert>
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
