
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Send, Laptop, Desktop, Monitor } from "lucide-react";
import { Device } from "@/lib/types/device.types";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MdmDeployDialogProps {
  profile: {
    id: string;
    name: string;
  };
  devices: Device[];
  onDeploy: (deviceIds: string[]) => void;
}

export function MdmDeployDialog({ profile, devices, onDeploy }: MdmDeployDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  
  const handleToggleDevice = (deviceId: string) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId) 
        : [...prev, deviceId]
    );
  };
  
  const handleToggleAll = () => {
    if (selectedDevices.length === devices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(devices.map(d => d.id));
    }
  };
  
  const handleDeploy = () => {
    onDeploy(selectedDevices);
    setOpen(false);
    setSelectedDevices([]);
  };
  
  // Only include online devices that we can deploy to
  const availableDevices = devices.filter(device => device.status === 'online');
  
  const getDeviceIcon = (device: Device) => {
    const model = device.model.toLowerCase();
    if (model.includes('laptop') || model.includes('macbook') || model.includes('thinkpad')) {
      return <Laptop className="h-4 w-4" />;
    } else if (model.includes('desktop') || model.includes('tower') || model.includes('workstation')) {
      return <Desktop className="h-4 w-4" />;
    }
    return <Monitor className="h-4 w-4" />;
  };
  
  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Send className="h-4 w-4" />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Deploy Profile: {profile.name}</DialogTitle>
          </DialogHeader>
          
          {availableDevices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No online devices available for deployment.</p>
              <p className="text-sm text-muted-foreground mt-2">Profiles can only be deployed to online devices.</p>
            </div>
          ) : (
            <>
              <ScrollArea className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedDevices.length === availableDevices.length && availableDevices.length > 0}
                          onCheckedChange={handleToggleAll}
                        />
                      </TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>OS Version</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Last Seen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableDevices.map(device => (
                      <TableRow key={device.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedDevices.includes(device.id)}
                            onCheckedChange={() => handleToggleDevice(device.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(device)}
                            <div>
                              <div>{device.name}</div>
                              <div className="text-xs text-muted-foreground">{device.model}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{device.osVersion}</TableCell>
                        <TableCell>{device.user}</TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(device.lastSeen), { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              
              <p className="text-sm text-muted-foreground mt-2">
                {selectedDevices.length} device(s) selected for deployment
              </p>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleDeploy} 
                  disabled={selectedDevices.length === 0}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Deploy Profile
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
