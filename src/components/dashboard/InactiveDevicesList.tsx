
import { Device } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Battery, BatteryMedium, BatteryLow, BatteryWarning, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InactiveDevicesListProps {
  devices: Device[];
}

export function InactiveDevicesList({ devices }: InactiveDevicesListProps) {
  const getBatteryIcon = (level: number) => {
    if (level >= 70) {
      return <Battery className="h-4 w-4 text-green-500" />;
    } else if (level >= 30) {
      return <BatteryMedium className="h-4 w-4 text-yellow-500" />;
    } else if (level > 10) {
      return <BatteryLow className="h-4 w-4 text-orange-500" />;
    } else {
      return <BatteryWarning className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id} className="bg-amber-50">
              <TableCell>
                <div className="font-medium">{device.name}</div>
                <div className="text-xs text-muted-foreground">{device.model}</div>
              </TableCell>
              <TableCell>{device.user}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={device.status === 'offline' ? 'border-red-200 bg-red-50 text-red-700' : 'border-amber-200 bg-amber-50 text-amber-700'}
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {device.status === 'offline' ? 'Offline' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(device.lastSeen), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getBatteryIcon(device.batteryLevel)}
                  <span>{device.batteryLevel}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/device/${device.id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
