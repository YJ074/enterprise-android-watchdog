
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
  AlertTriangle,
  ActivityIcon,
  Monitor
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { activityLogs } from "@/lib/mock-data";

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
  
  // Get device specific activities
  const deviceActivities = activityLogs
    .filter(log => log.deviceId === id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  // Activity type functions
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'app_install':
        return "📲";
      case 'app_uninstall':
        return "🗑️";
      case 'login':
        return "🔐";
      case 'logout':
        return "👋";
      case 'location_change':
        return "📍";
      case 'policy_violation':
        return "⚠️";
      case 'system_update':
        return "⬆️";
      case 'whatsapp_message':
        return "💬";
      case 'gmail_access':
        return "📧";
      case 'call_recorded':
        return "📞";
      case 'screenshot':
        return "📸";
      case 'keylogger':
        return "⌨️";
      case 'browsing_history':
        return "🌐";
      case 'file_access':
        return "📄";
      default:
        return "📱";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'info':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return null;
    }
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
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
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
          <div className="text-sm font-medium mb-4 flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-muted-foreground" />
            Recent Activities
          </div>
          
          <div className="mb-4">
            <Input placeholder="Search activities..." className="w-full" />
          </div>
          
          <div className="space-y-4">
            {deviceActivities.length > 0 ? (
              deviceActivities.map((activity) => (
                <div key={activity.id} className="p-4 border rounded-md bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{activity.details}</h4>
                        {getSeverityBadge(activity.severity)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(new Date(activity.timestamp), "PPp")}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No activity logs found for this device
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline">
              <Link to="/activity">View All Activity</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring" className="p-4 border rounded-md mt-2">
          <div className="text-sm font-medium mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5 text-muted-foreground" />
            Monitoring Controls
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Communication Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>WhatsApp Tracking</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gmail Monitoring</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Call Recording</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Screen Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Screenshot Interval</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Keylogger</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Browsing History</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <Button className="w-full">Enable All Monitoring</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="policies" className="p-4 border rounded-md mt-2">
          <div className="text-sm font-medium mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            Device Policies
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 border rounded-md bg-muted/30">
              <h4 className="font-medium">Security Policy</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Default security policies are applied to this device.
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-muted/30">
              <h4 className="font-medium">Application Policy</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Restricted application access is enabled.
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-muted/30">
              <h4 className="font-medium">Data Policy</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Data encryption and access controls are enabled.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
