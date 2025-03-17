
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { devices } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Battery, BatteryMedium, BatteryLow, BatteryWarning } from "lucide-react";

export function DeviceListTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500">Online</Badge>;
      case 'offline':
        return <Badge variant="outline" className="text-gray-500">Offline</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'compromised':
        return <Badge className="bg-red-500">Compromised</Badge>;
      default:
        return null;
    }
  };

  const getBatteryIcon = (level: number) => {
    if (level >= 70) {
      return <Battery className="h-5 w-5 text-green-500" />;
    } else if (level >= 30) {
      return <BatteryMedium className="h-5 w-5 text-yellow-500" />;
    } else if (level > 10) {
      return <BatteryLow className="h-5 w-5 text-orange-500" />;
    } else {
      return <BatteryWarning className="h-5 w-5 text-red-500" />;
    }
  };

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
              <TableCell>{getStatusBadge(device.status)}</TableCell>
              <TableCell>{device.osVersion}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getBatteryIcon(device.batteryLevel)}
                  <span>{device.batteryLevel}%</span>
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(device.lastSeen), "MM/dd/yyyy h:mm a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
