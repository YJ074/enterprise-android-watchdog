
import { devices } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PackageCheck } from "lucide-react";
import { format } from "date-fns";

type AppsTabProps = {
  deviceId: string;
};

export function AppsTab({ deviceId }: AppsTabProps) {
  const device = devices.find(d => d.id === deviceId);
  
  if (!device) {
    return <div>Device not found</div>;
  }

  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="text-sm font-medium mb-4 flex items-center gap-2">
        <PackageCheck className="h-5 w-5 text-muted-foreground" />
        Installed Applications ({device.applications.length})
      </div>
      <div className="space-y-4">
        {device.applications.map((app) => (
          <div key={app.id} className="p-4 border rounded-md bg-muted/30">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{app.name}</h4>
                <div className="text-sm text-muted-foreground">
                  Version {app.version} • {app.size} MB
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Installed: {format(new Date(app.installDate), "PP")}
                </div>
              </div>
              <div>
                {app.isSystemApp ? (
                  <Badge variant="outline" className="bg-muted">System App</Badge>
                ) : (
                  <Button variant="outline" size="sm">Uninstall</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
