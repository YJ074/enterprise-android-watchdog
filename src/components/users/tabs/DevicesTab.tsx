
import { useState } from "react";
import { Link } from "react-router-dom";
import { devices } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Search, Smartphone, Laptop, Monitor, Tablet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type DevicesTabProps = {
  userId: string;
};

export function DevicesTab({ userId }: DevicesTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get all devices associated with this user
  const userDevices = devices.filter(device => device.user === userId);
  
  // Filter devices based on search term
  const filteredDevices = userDevices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.osVersion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getDeviceIcon = (model: string) => {
    if (model.includes('Galaxy Tab') || model.includes('iPad')) {
      return <Tablet className="h-5 w-5 text-gray-500" />;
    } else if (model.includes('MacBook') || model.includes('ThinkPad')) {
      return <Laptop className="h-5 w-5 text-gray-500" />;
    } else if (model.includes('iMac') || model.includes('Desktop')) {
      return <Monitor className="h-5 w-5 text-gray-500" />;
    } else {
      return <Smartphone className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      {filteredDevices.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>OS Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(device.model)}
                    {device.name}
                  </div>
                </TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{device.osVersion}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      device.status === 'online' 
                        ? 'default' 
                        : device.status === 'offline' 
                          ? 'secondary' 
                          : device.status === 'warning' 
                            ? 'outline' 
                            : 'destructive'
                    }
                  >
                    {device.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(device.lastSeen), { addSuffix: true })}
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
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No devices found matching your search criteria.
        </div>
      )}
    </div>
  );
}
