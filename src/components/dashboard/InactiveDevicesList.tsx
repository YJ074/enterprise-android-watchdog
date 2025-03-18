
import { Device } from "@/lib/mock-data";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeviceRow } from "./DeviceRow";

interface InactiveDevicesListProps {
  devices: Device[];
}

export function InactiveDevicesList({ devices }: InactiveDevicesListProps) {
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
            <DeviceRow key={device.id} device={device} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
