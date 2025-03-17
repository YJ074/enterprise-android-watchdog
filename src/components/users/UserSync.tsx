
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCw, UploadCloud, Users } from "lucide-react";

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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sync-source">Synchronization Source</Label>
            <Select value={syncSource} onValueChange={setSyncSource}>
              <SelectTrigger id="sync-source">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ldap">LDAP Directory</SelectItem>
                <SelectItem value="azure">Azure Active Directory</SelectItem>
                <SelectItem value="google">Google Workspace</SelectItem>
                <SelectItem value="okta">Okta</SelectItem>
                <SelectItem value="csv">CSV Upload</SelectItem>
                <SelectItem value="api">External API</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {syncSource === "api" && (
            <div className="space-y-2">
              <Label htmlFor="webhook-url">API Endpoint URL</Label>
              <Input 
                id="webhook-url" 
                placeholder="https://api.example.com/users" 
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter the URL of the API endpoint to fetch users from.
              </p>
            </div>
          )}

          {syncSource === "csv" && (
            <div className="space-y-2">
              <Label htmlFor="csv-upload">Upload CSV File</Label>
              <div className="flex items-center gap-2">
                <Input id="csv-upload" type="file" accept=".csv" />
                <Button size="sm">
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload a CSV file with user data. The file should include columns for username, email, and role.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Automatic Synchronization</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync users on a regular schedule.
              </p>
            </div>
            <Switch 
              id="auto-sync" 
              checked={autoSync} 
              onCheckedChange={setAutoSync} 
            />
          </div>

          {autoSync && (
            <div className="space-y-2 ml-6 pl-2 border-l-2 border-muted">
              <Label htmlFor="sync-interval">Sync Interval</Label>
              <Select value={syncInterval} onValueChange={setSyncInterval}>
                <SelectTrigger id="sync-interval">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

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
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            onClick={handleSyncNow} 
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
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
