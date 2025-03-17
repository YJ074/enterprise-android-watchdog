
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, BarChart, Clock, AlertTriangle } from "lucide-react";
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'warning': return 'bg-yellow-500';
      case 'compromised': return 'bg-red-500';
      default: return 'bg-gray-400';
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
              <Smartphone className="h-5 w-5 text-muted-foreground" />
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
            <Badge className={getStatusColor(device.status)}>
              {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
