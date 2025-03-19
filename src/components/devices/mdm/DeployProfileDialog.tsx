
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Device } from "@/hooks/devices/types";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Laptop, Smartphone, Send } from "lucide-react";

interface DeployProfileDialogProps {
  trigger: React.ReactNode;
  profileId: string;
  profileName: string;
  devices: Device[];
  onDeploy: (deviceIds: string[]) => void;
}

export function DeployProfileDialog({ 
  trigger, 
  profileId, 
  profileName, 
  devices, 
  onDeploy 
}: DeployProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const { toast } = useToast();
  
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
    toast({
      title: "Deployment Initiated",
      description: `Profile "${profileName}" is being deployed to ${selectedDevices.length} devices.`,
      duration: 5000,
    });
    setOpen(false);
    setSelectedDevices([]);
  };
  
  // Filter only online devices, as we can only deploy to them
  const availableDevices = devices.filter(device => device.status === 'online');
  
  const getDeviceIcon = (device: Device) => {
    if (device.model.includes('MacBook') || device.model.includes('ThinkPad')) {
      return <Laptop className="h-4 w-4" />;
    }
    return <Smartphone className="h-4 w-4" />;
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Deploy "{profileName}" Profile</DialogTitle>
        </DialogHeader>
        
        {availableDevices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No online devices available for deployment.</p>
            <p className="text-sm text-muted-foreground mt-2">Profiles can only be deployed to online devices.</p>
          </div>
        ) : (
          <>
            <div className="max-h-[400px] overflow-y-auto">
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
                    <TableHead>User</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Status</TableHead>
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
                          {device.name}
                        </div>
                      </TableCell>
                      <TableCell>{device.user_id}</TableCell>
                      <TableCell>{device.department}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(device.last_seen), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {device.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
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
  );
}
