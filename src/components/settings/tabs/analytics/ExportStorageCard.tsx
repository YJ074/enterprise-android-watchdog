
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Download, UploadCloud, RefreshCw } from "lucide-react";
import { ExportOption } from "./ExportOption";
import { DataRetentionInfo } from "./DataRetentionInfo";
import { ExportActionButtons } from "./ExportActionButtons";

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
        <ExportOption
          title="Automatic Exports"
          description="Schedule regular exports of analytics data"
          checked={settings.autoExport}
          onCheckedChange={(checked) => onSettingChange("autoExport", checked)}
        />

        <DataRetentionInfo period={settings.retentionPeriod} />
        
        <ExportActionButtons onExportData={onExportData} />
      </CardContent>
    </Card>
  );
}
