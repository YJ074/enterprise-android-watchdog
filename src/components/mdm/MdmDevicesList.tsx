
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Monitor, 
  Laptop, 
  Desktop, 
  AlertTriangle, 
  Info,
  Lock
} from "lucide-react";
import { useComputerDevices } from "@/hooks/useComputerDevices";
import { format, parseISO } from "date-fns";
import { Device } from "@/lib/types/device.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function MdmDevicesList({ getDeviceProfiles }) {
  const { computerDevices, handleRefresh, isLoading } = useComputerDevices();
  
  const getDeviceIcon = (device: Device) => {
    const model = device.model.toLowerCase();
    if (model.includes('laptop') || model.includes('macbook') || model.includes('thinkpad')) {
      return <Laptop className="h-4 w-4" />;
    } else if (model.includes('desktop') || model.includes('tower') || model.includes('workstation')) {
      return <Desktop className="h-4 w-4" />;
    }
    return <Monitor className="h-4 w-4" />;
  };
  
  const getOsType = (device: Device) => {
    const os = device.osVersion.toLowerCase();
    if (os.includes('windows')) return 'windows';
    if (os.includes('mac') || os.includes('osx')) return 'macos';
    if (os.includes('linux')) return 'linux';
    return 'other';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Managed Computers</h2>
        <Button onClick={handleRefresh} disabled={isLoading}>
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Computers</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{computerDevices.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Windows Computers</CardTitle>
            <Desktop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {computerDevices.filter(d => getOsType(d) === 'windows').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">macOS Computers</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {computerDevices.filter(d => getOsType(d) === 'macos').length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {computerDevices.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No computers found. Connect your first device to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Computer</TableHead>
              <TableHead>OS</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computerDevices.map((device) => {
              const profiles = getDeviceProfiles(device.id);
              const isCompliant = profiles.length > 0;
              
              return (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device)}
                      <div>
                        <div>{device.name}</div>
                        <div className="text-xs text-muted-foreground">{device.model}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {device.osVersion}
                    </Badge>
                  </TableCell>
                  <TableCell>{device.user}</TableCell>
                  <TableCell>{device.department}</TableCell>
                  <TableCell>
                    {isCompliant ? (
                      <HoverCard>
                        <HoverCardTrigger>
                          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200 cursor-help flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>Compliant</span>
                          </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Applied Profiles</h4>
                            <ul className="text-xs space-y-1">
                              {profiles.map(profile => (
                                <li key={profile.id} className="flex items-center gap-1">
                                  <Shield className="h-3 w-3 text-green-600" />
                                  {profile.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Non-compliant</span>
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(device.lastSeen), "MM/dd/yyyy h:mm a")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Lock Device">
                        <Lock className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
