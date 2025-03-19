
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { DeviceBatteryIndicator } from "@/components/dashboard/DeviceBatteryIndicator";
import { DeviceBadge } from "@/components/dashboard/DeviceBadge";
import { DeviceRiskBadge } from "./DeviceRiskBadge";
import { calculateDeviceRiskScore } from "@/hooks/useDeviceRiskAssessment";
import { Device } from "@/lib/types/device.types";

interface DeviceListTableProps {
  devices: Device[];
  selectedDevices: Device[];
  onSelectDevice: (device: Device, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

export function DeviceListTable({ 
  devices, 
  selectedDevices, 
  onSelectDevice, 
  onSelectAll 
}: DeviceListTableProps) {
  if (devices.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No devices found. Add a device to get started.
      </div>
    );
  }

  const allSelected = devices.length > 0 && selectedDevices.length === devices.length;
  const someSelected = selectedDevices.length > 0 && selectedDevices.length < devices.length;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={allSelected} 
                onCheckedChange={onSelectAll}
                aria-label="Select all devices"
                ref={(checkbox) => {
                  // This is needed for the indeterminate state
                  if (checkbox) {
                    checkbox.indeterminate = someSelected;
                  }
                }}
              />
            </TableHead>
            <TableHead>Device</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>OS Version</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => {
            const isSelected = selectedDevices.some(d => d.id === device.id);
            const riskScore = calculateDeviceRiskScore(device);
            
            return (
              <TableRow key={device.id} className={isSelected ? "bg-muted/30" : undefined}>
                <TableCell>
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelectDevice(device, !!checked)}
                    aria-label={`Select ${device.name}`}
                  />
                </TableCell>
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
                <TableCell>
                  <DeviceRiskBadge riskScore={riskScore} compact />
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
