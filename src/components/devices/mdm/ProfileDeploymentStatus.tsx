
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Device } from "@/hooks/devices/types";
import { format } from "date-fns";
import { Laptop, Smartphone, Check, AlertTriangle, Clock } from "lucide-react";

type DeploymentStatus = "pending" | "deployed" | "failed";

interface DeploymentRecord {
  deviceId: string;
  deviceName: string;
  status: DeploymentStatus;
  timestamp: string;
  errorMessage?: string;
}

interface ProfileDeploymentStatusProps {
  profileId: string;
  profileName: string;
  devices: Device[];
}

export function ProfileDeploymentStatus({ 
  profileId, 
  profileName, 
  devices 
}: ProfileDeploymentStatusProps) {
  // Mock deployment records for demonstration
  const [deployments] = useState<DeploymentRecord[]>([
    {
      deviceId: devices[0]?.id || "device-1",
      deviceName: devices[0]?.name || "John's iPhone",
      status: "deployed",
      timestamp: new Date().toISOString()
    },
    {
      deviceId: devices[1]?.id || "device-2",
      deviceName: devices[1]?.name || "Sarah's Macbook",
      status: "deployed",
      timestamp: new Date().toISOString()
    },
    {
      deviceId: "device-3",
      deviceName: "Meeting Room iPad",
      status: "failed",
      timestamp: new Date().toISOString(),
      errorMessage: "Device offline"
    },
    {
      deviceId: "device-4",
      deviceName: "Mark's Android Phone",
      status: "pending",
      timestamp: new Date().toISOString()
    }
  ]);
  
  const getStatusIcon = (status: DeploymentStatus) => {
    switch (status) {
      case "deployed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: DeploymentStatus) => {
    switch (status) {
      case "deployed":
        return "bg-green-50 text-green-700 border-green-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "";
    }
  };
  
  const getDeviceIcon = (deviceName: string) => {
    if (deviceName.toLowerCase().includes('macbook') || 
        deviceName.toLowerCase().includes('laptop')) {
      return <Laptop className="h-4 w-4" />;
    }
    return <Smartphone className="h-4 w-4" />;
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Deployment Status for "{profileName}"</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map(deployment => (
            <TableRow key={deployment.deviceId}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(deployment.deviceName)}
                  {deployment.deviceName}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${getStatusColor(deployment.status)}`}
                >
                  {getStatusIcon(deployment.status)}
                  <span className="capitalize">{deployment.status}</span>
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(deployment.timestamp), "MMM d, yyyy 'at' h:mm a")}
              </TableCell>
              <TableCell>
                {deployment.errorMessage || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
