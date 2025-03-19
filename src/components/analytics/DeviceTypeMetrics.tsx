
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deviceTypeMetrics } from "@/lib/mock/metrics.data";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Laptop, Monitor, Tablet, Network } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeviceTypeMetrics() {
  // Map for device type icons
  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "smartphone":
        return <Smartphone className="h-5 w-5 text-blue-500" />;
      case "laptop":
        return <Laptop className="h-5 w-5 text-indigo-500" />;
      case "desktop pc":
        return <Monitor className="h-5 w-5 text-purple-500" />;
      case "tablet":
        return <Tablet className="h-5 w-5 text-green-500" />;
      default:
        return <Network className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Device Type Distribution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deviceTypeMetrics.map((device) => (
          <Card key={device.type} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getDeviceIcon(device.type)}
                  <CardTitle className="text-lg">{device.type}</CardTitle>
                </div>
                <div className="text-sm font-medium">
                  {device.count} devices
                </div>
              </div>
              <CardDescription>
                {device.recentIssues > 0 
                  ? `${device.recentIssues} recent issue${device.recentIssues > 1 ? 's' : ''}`
                  : 'No recent issues'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Compliance: {device.compliance}%</span>
                </div>
                <Progress 
                  value={device.compliance} 
                  indicatorClassName={cn(
                    device.compliance > 90 ? "bg-emerald-500" : null,
                    device.compliance > 80 && device.compliance <= 90 ? "bg-blue-500" : null,
                    device.compliance <= 80 ? "bg-amber-500" : null
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
