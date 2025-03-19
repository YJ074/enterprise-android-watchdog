
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Download, UploadCloud, RefreshCw } from "lucide-react";

type ExportStorageCardProps = {
  settings: {
    autoExport: boolean;
    retentionPeriod: string;
  };
  onSettingChange: (key: string, value: boolean) => void;
  onExportData: () => void;
};

export function ExportStorageCard({ settings, onSettingChange, onExportData }: ExportStorageCardProps) {
  return (
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
            onCheckedChange={(checked) => onSettingChange("autoExport", checked)}
          />
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="font-medium">Data Retention Period</h4>
          <p className="text-sm text-muted-foreground">
            Currently set to: {settings.retentionPeriod}
          </p>
        </div>

        <div className="flex flex-col space-y-2 pt-4">
          <Button className="w-full sm:w-auto" onClick={onExportData}>
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
  );
}
