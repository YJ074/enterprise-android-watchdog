
import { Device } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { InactiveDevicesList } from "./InactiveDevicesList";

interface InactiveDevicesCardProps {
  devices: Device[];
}

export function InactiveDevicesCard({ devices }: InactiveDevicesCardProps) {
  if (devices.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-amber-600">
          <Clock className="h-5 w-5 mr-2" />
          Inactive Devices ({devices.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InactiveDevicesList devices={devices} />
      </CardContent>
    </Card>
  );
}
