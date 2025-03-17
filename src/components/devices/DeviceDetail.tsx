
import { useParams } from "react-router-dom";
import { devices } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldCheck, 
  Smartphone, 
  ArrowLeft, 
  Lock, 
  RefreshCw, 
  HardDrive,
  Clock,
  MapPin,
  BarChart,
  PackageCheck,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export function DeviceDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const device = devices.find(d => d.id === id);
  
  if (!device) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Device Not Found</h1>
        <p>The device with ID {id} was not found.</p>
        <Button asChild className="mt-4">
          <Link to="/devices">Back to Devices</Link>
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'warning': return 'bg-yellow-500';
      case 'compromised': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const handleLockDevice = () => {
    toast({
      title: "Device Locked",
      description: `${device.name} has been locked remotely.`,
      duration: 3000,
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: `${device.name} data has been refreshed.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/devices">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{device.name}</h1>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleLockDevice}>
            <Lock className="h-4 w-4 mr-2" />
            Lock Device
          </Button>
          <Button>
            <ShieldCheck className="h-4 w-4 mr-2" />
            Security Actions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Model</span>
                </div>
                <span>{device.model}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">OS Version</span>
                </div>
                <span>{device.osVersion}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Last Seen</span>
                </div>
                <span>{format(new Date(device.lastSeen), "PPp")}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Status</span>
                </div>
                <Badge className={getStatusColor(device.status)}>
                  {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Storage & Battery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Battery Level</span>
                  <span className="text-sm">{device.batteryLevel}%</span>
                </div>
                <Progress value={device.batteryLevel} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Storage Used</span>
                  </div>
                  <span className="text-sm">{device.storageUsed} / {device.totalStorage} GB</span>
                </div>
                <Progress value={(device.storageUsed / device.totalStorage) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">User & Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Assigned To</span>
                <div className="font-medium text-lg">{device.user}</div>
                <div className="text-sm text-muted-foreground">{device.department} Department</div>
              </div>
              
              {device.location && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Last Known Location</span>
                  </div>
                  <div className="text-sm">{device.location.address}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Lat: {device.location.latitude.toFixed(4)}, Long: {device.location.longitude.toFixed(4)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="apps">
        <TabsList>
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        <TabsContent value="apps" className="p-4 border rounded-md mt-2">
          <div className="text-sm font-medium mb-4 flex items-center gap-2">
            <PackageCheck className="h-5 w-5 text-muted-foreground" />
            Installed Applications ({device.applications.length})
          </div>
          <div className="space-y-4">
            {device.applications.map((app) => (
              <div key={app.id} className="p-4 border rounded-md bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{app.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      Version {app.version} • {app.size} MB
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Installed: {format(new Date(app.installDate), "PP")}
                    </div>
                  </div>
                  <div>
                    {app.isSystemApp ? (
                      <Badge variant="outline" className="bg-muted">System App</Badge>
                    ) : (
                      <Button variant="outline" size="sm">Uninstall</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="activity" className="p-4 border rounded-md mt-2">
          <p className="text-muted-foreground">Activity log will be displayed here.</p>
        </TabsContent>
        <TabsContent value="policies" className="p-4 border rounded-md mt-2">
          <p className="text-muted-foreground">Device policies will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
