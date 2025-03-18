
import { Device } from "@/lib/mock-data";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeviceBadge } from "./DeviceBadge";
import { DeviceBatteryIndicator } from "./DeviceBatteryIndicator";

interface DeviceRowProps {
  device: Device;
}

export function DeviceRow({ device }: DeviceRowProps) {
  return (
    <TableRow key={device.id} className="bg-amber-50">
      <TableCell>
        <div className="font-medium">{device.name}</div>
        <div className="text-xs text-muted-foreground">{device.model}</div>
      </TableCell>
      <TableCell>{device.user}</TableCell>
      <TableCell>
        <DeviceBadge status={device.status} />
      </TableCell>
      <TableCell>
        {formatDistanceToNow(new Date(device.lastSeen), { addSuffix: true })}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <DeviceBatteryIndicator level={device.batteryLevel} />
          <span>{device.batteryLevel}%</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/device/${device.id}`}>View Details</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
