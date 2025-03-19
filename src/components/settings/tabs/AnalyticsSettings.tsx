
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2, BarChart3, Download } from "lucide-react";
import { DataCollectionCard } from "./analytics/DataCollectionCard";
import { ChartPreviewCard } from "./analytics/ChartPreviewCard";
import { ExportStorageCard } from "./analytics/ExportStorageCard";

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
          <DataCollectionCard 
            settings={settings}
            onSettingChange={handleSettingChange}
            onSave={handleSaveSettings}
          />
        </TabsContent>

        <TabsContent value="data-visualization" className="space-y-4">
          <ChartPreviewCard onSave={handleSaveSettings} />
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <ExportStorageCard 
            settings={settings}
            onSettingChange={handleSettingChange}
            onExportData={handleExportData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
