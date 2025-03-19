
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Settings2, 
  Download,
  UploadCloud,
  RefreshCw
} from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";

export function AnalyticsSettings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preferences");
  const [settings, setSettings] = useState({
    dataCollection: true,
    anonymousUsage: true,
    shareCrashReports: true,
    sharePerformanceData: false,
    autoExport: false,
    retentionPeriod: "90 days"
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Analytics Settings Saved",
      description: "Your analytics preferences have been updated successfully",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your analytics data export has been initiated",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Analytics Settings</h3>
        <p className="text-muted-foreground mt-2">
          Configure how analytics data is collected, stored, and processed.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="preferences">
            <Settings2 className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="data-visualization">
            <BarChart3 className="mr-2 h-4 w-4" />
            Data Visualization
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="mr-2 h-4 w-4" />
            Export & Storage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection & Privacy</CardTitle>
              <CardDescription>
                Configure what data is collected and how it is used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Enable Data Collection</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow the system to collect usage data for analytics purposes
                  </p>
                </div>
                <Switch
                  checked={settings.dataCollection}
                  onCheckedChange={(checked) => handleSettingChange("dataCollection", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Anonymous Usage Statistics</h4>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous usage data to help improve the platform
                  </p>
                </div>
                <Switch
                  checked={settings.anonymousUsage}
                  onCheckedChange={(checked) => handleSettingChange("anonymousUsage", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Crash Reports</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically send crash reports to improve stability
                  </p>
                </div>
                <Switch
                  checked={settings.shareCrashReports}
                  onCheckedChange={(checked) => handleSettingChange("shareCrashReports", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    Share performance metrics to help optimize the system
                  </p>
                </div>
                <Switch
                  checked={settings.sharePerformanceData}
                  onCheckedChange={(checked) => handleSettingChange("sharePerformanceData", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data-visualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chart & Visualization Defaults</CardTitle>
              <CardDescription>
                Configure default chart types and visualization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-muted">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Bar Charts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-sm text-muted-foreground">Default for categorical data</p>
                  </CardContent>
                </Card>

                <Card className="border border-muted">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base flex items-center">
                      <LineChart className="mr-2 h-4 w-4" />
                      Line Charts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-sm text-muted-foreground">Default for time series data</p>
                  </CardContent>
                </Card>

                <Card className="border border-muted">
                  <CardHeader className="p-3">
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="mr-2 h-4 w-4" />
                      Pie Charts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-sm text-muted-foreground">Default for distribution data</p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Chart Preview</h4>
                <div className="border rounded-md p-4 bg-card">
                  <ChartContainer
                    config={{
                      example: {
                        label: "Example Chart",
                        theme: {
                          light: "#9b87f5",
                          dark: "#9b87f5",
                        },
                      }
                    }}
                  >
                    <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                      Chart Preview Placeholder
                    </div>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Default Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export & Data Storage</CardTitle>
              <CardDescription>
                Configure how analytics data is exported and stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Automatic Exports</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule regular exports of analytics data
                  </p>
                </div>
                <Switch
                  checked={settings.autoExport}
                  onCheckedChange={(checked) => handleSettingChange("autoExport", checked)}
                />
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-medium">Data Retention Period</h4>
                <p className="text-sm text-muted-foreground">
                  Currently set to: {settings.retentionPeriod}
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-4">
                <Button className="w-full sm:w-auto" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Analytics Data
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Import Historical Data
                  </Button>
                  
                  <Button variant="outline" className="w-full sm:w-auto">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
