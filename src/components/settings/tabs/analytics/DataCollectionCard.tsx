
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type DataCollectionCardProps = {
  settings: {
    dataCollection: boolean;
    anonymousUsage: boolean;
    shareCrashReports: boolean;
    sharePerformanceData: boolean;
  };
  onSettingChange: (key: string, value: boolean) => void;
  onSave: () => void;
};

export function DataCollectionCard({ settings, onSettingChange, onSave }: DataCollectionCardProps) {
  return (
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
            onCheckedChange={(checked) => onSettingChange("dataCollection", checked)}
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
            onCheckedChange={(checked) => onSettingChange("anonymousUsage", checked)}
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
            onCheckedChange={(checked) => onSettingChange("shareCrashReports", checked)}
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
            onCheckedChange={(checked) => onSettingChange("sharePerformanceData", checked)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
}
