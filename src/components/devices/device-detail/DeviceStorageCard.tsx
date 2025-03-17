
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardDrive } from "lucide-react";

type DeviceStorageCardProps = {
  device: {
    batteryLevel: number;
    storageUsed: number;
    totalStorage: number;
  };
};

export function DeviceStorageCard({ device }: DeviceStorageCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Storage & Battery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Battery Level</span>
              <span className="text-sm">{device.batteryLevel}%</span>
            </div>
            <Progress value={device.batteryLevel} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Storage Used</span>
              </div>
              <span className="text-sm">{device.storageUsed} / {device.totalStorage} GB</span>
            </div>
            <Progress value={(device.storageUsed / device.totalStorage) * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
