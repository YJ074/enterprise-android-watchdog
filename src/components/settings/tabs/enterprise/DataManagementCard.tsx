
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Database, HardDrive, Cloud } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function DataManagementCard() {
  const [auditLogging, setAuditLogging] = useState(true);
  const [dataRetention, setDataRetention] = useState(90);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <span>Data Management</span>
        </CardTitle>
        <CardDescription>
          Configure data retention and compliance settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="audit-logging" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Audit Logging
            </Label>
            <p className="text-sm text-muted-foreground">
              Keep detailed logs of all system activities.
            </p>
          </div>
          <Switch 
            id="audit-logging" 
            checked={auditLogging} 
            onCheckedChange={setAuditLogging} 
          />
        </div>
        
        <div className="pt-2 space-y-2">
          <Label htmlFor="data-retention" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Data Retention Period (days)
          </Label>
          <div className="space-y-4">
            <Slider 
              id="data-retention"
              min={30}
              max={365}
              step={30}
              value={[dataRetention]}
              onValueChange={(value) => setDataRetention(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30 days</span>
              <span>Current: {dataRetention} days</span>
              <span>365 days</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Data older than the retention period will be automatically archived.
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label htmlFor="data-encryption">Data Encryption</Label>
            <p className="text-sm text-muted-foreground">
              Enable end-to-end encryption for sensitive data.
            </p>
          </div>
          <Switch id="data-encryption" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <Label htmlFor="data-backup">Automatic Backups</Label>
            <p className="text-sm text-muted-foreground">
              Schedule regular backups of your data.
            </p>
          </div>
          <Switch id="data-backup" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
