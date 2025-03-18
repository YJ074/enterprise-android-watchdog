
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { DeviceBatteryIndicator } from "@/components/dashboard/DeviceBatteryIndicator";
import { DeviceBadge } from "@/components/dashboard/DeviceBadge";
import { Device } from "@/lib/types/device.types";

interface DeviceListTableProps {
  devices: Device[];
}

export function DeviceListTable({ devices }: DeviceListTableProps) {
  if (devices.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No devices found. Add a device to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>OS Version</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">
                <Link to={`/device/${device.id}`} className="text-enterprise-600 hover:underline">
                  {device.name}
                </Link>
                <div className="text-xs text-muted-foreground">{device.model}</div>
              </TableCell>
              <TableCell>
                <div>{device.user}</div>
                <div className="text-xs text-muted-foreground">{device.department}</div>
              </TableCell>
              <TableCell>
                <DeviceBadge status={device.status} />
              </TableCell>
              <TableCell>{device.osVersion}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <DeviceBatteryIndicator level={device.batteryLevel} />
                  <span>{device.batteryLevel}%</span>
                </div>
              </TableCell>
              <TableCell>
                {format(parseISO(device.lastSeen), "MM/dd/yyyy h:mm a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
