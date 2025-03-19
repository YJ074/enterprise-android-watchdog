
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceBadge } from "@/components/dashboard/DeviceBadge";
import { Smartphone, BarChart, Clock, AlertTriangle, Laptop, Monitor, Tablet } from "lucide-react";
import { format } from "date-fns";

type DeviceInfoCardProps = {
  device: {
    model: string;
    osVersion: string;
    lastSeen: string;
    status: string;
  };
};

export function DeviceInfoCard({ device }: DeviceInfoCardProps) {
  // Get appropriate device icon based on model name
  const getDeviceIcon = () => {
    const modelLower = device.model.toLowerCase();
    if (modelLower.includes('macbook') || modelLower.includes('laptop') || modelLower.includes('thinkpad')) {
      return <Laptop className="h-5 w-5 text-muted-foreground" />;
    } else if (modelLower.includes('imac') || modelLower.includes('desktop') || modelLower.includes('pc')) {
      return <Monitor className="h-5 w-5 text-muted-foreground" />;
    } else if (modelLower.includes('ipad') || modelLower.includes('tab')) {
      return <Tablet className="h-5 w-5 text-muted-foreground" />;
    } else {
      return <Smartphone className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Device Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getDeviceIcon()}
              <span className="font-medium">Model</span>
            </div>
            <span>{device.model}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">OS Version</span>
            </div>
            <span>{device.osVersion}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Last Seen</span>
            </div>
            <span>{format(new Date(device.lastSeen), "PPp")}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Status</span>
            </div>
            <DeviceBadge status={device.status as 'online' | 'offline' | 'warning' | 'compromised'} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
