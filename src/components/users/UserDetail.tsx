import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, RefreshCw, Lock, Ban, User, Bell } from "lucide-react";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserTabs } from "./UserTabs";
import { activityLogs, devices } from "@/lib/mock-data";

interface UserDetailProps {
  userId: string;
}

export function UserDetail({ userId }: UserDetailProps) {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(true);
  
  // For demo purposes, extract username from userId
  const username = `user_${userId.substring(0, 5)}`;
  const fullName = `${username.charAt(0).toUpperCase() + username.slice(1).replace('_', ' ')}`;
  
  // Get all devices associated with this user
  const userDevices = devices.filter(device => device.user === userId);
  
  // Get all activity logs for this user's devices
  const userActivities = activityLogs.filter(log => 
    userDevices.some(device => device.id === log.deviceId)
  );
  
  const lastActive = userActivities.length > 0 
    ? new Date(Math.max(...userActivities.map(a => new Date(a.timestamp).getTime())))
    : null;
    
  const handleRefreshData = () => {
    toast({
      title: "User Data Refreshed",
      description: `${fullName}'s data has been refreshed.`,
      duration: 3000,
    });
  };
  
  const handleSuspendUser = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "User Suspended" : "User Activated",
      description: isActive 
        ? `${fullName} has been suspended.` 
        : `${fullName} has been activated.`,
      duration: 3000,
    });
  };
  
  const handleMuteNotifications = () => {
    toast({
      title: "Notifications Muted",
      description: `Notifications for ${fullName} have been muted.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/activity">Activity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/activity">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              {fullName}
              <span className={`inline-flex ml-2 h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </h1>
            <p className="text-muted-foreground text-sm">
              ID: {userId} • 
              {lastActive ? ` Last active: ${lastActive.toLocaleDateString()} ${lastActive.toLocaleTimeString()}` : ' No activity recorded'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleMuteNotifications}>
            <Bell className="h-4 w-4 mr-2" />
            Mute Notifications
          </Button>
          <Button 
            variant={isActive ? "destructive" : "outline"} 
            onClick={handleSuspendUser}
          >
            <Ban className="h-4 w-4 mr-2" />
            {isActive ? 'Suspend User' : 'Activate User'}
          </Button>
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserInfoCard 
          userId={userId} 
          username={username} 
          fullName={fullName} 
          isActive={isActive} 
        />
        <UserDevicesCard devices={userDevices} />
        <UserActivityCard activities={userActivities} />
      </div>
      
      {/* Tabs */}
      <UserTabs userId={userId} />
    </div>
  );
}

function UserInfoCard({ userId, username, fullName, isActive }: { 
  userId: string; 
  username: string; 
  fullName: string;
  isActive: boolean;
}) {
  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">User Information</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Username:</span>
          <span className="font-medium">{username}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Full Name:</span>
          <span className="font-medium">{fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span className={`font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
            {isActive ? 'Active' : 'Suspended'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">User ID:</span>
          <span className="font-medium text-xs truncate max-w-[150px]">{userId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">User Role:</span>
          <span className="font-medium">Standard User</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created:</span>
          <span className="font-medium">3 months ago</span>
        </div>
      </div>
    </div>
  );
}

function UserDevicesCard({ devices }: { devices: any[] }) {
  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Linked Devices</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {devices.length} device{devices.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-4">
        {devices.length > 0 ? devices.slice(0, 3).map(device => (
          <div key={device.id} className="flex items-center justify-between border-b pb-2 last:border-0">
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {device.type === 'mobile' ? '📱' : 
                 device.type === 'tablet' ? '📟' : 
                 device.type === 'laptop' ? '💻' : '🖥️'}
              </span>
              <div>
                <div className="font-medium">{device.name}</div>
                <div className="text-xs text-muted-foreground">{device.os} • Last seen: today</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/device/${device.id}`}>View</Link>
            </Button>
          </div>
        )) : (
          <div className="text-center py-4 text-muted-foreground">
            No devices linked to this user
          </div>
        )}
        
        {devices.length > 3 && (
          <div className="text-center pt-2">
            <Button variant="link" asChild>
              <Link to="/devices">View all {devices.length} devices</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function UserActivityCard({ activities }: { activities: any[] }) {
  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Recent Activity</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {activities.length} event{activities.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="space-y-3">
        {activities.length > 0 ? (
          activities
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 4)
            .map(activity => (
              <div key={activity.id} className="text-sm border-b pb-2 last:border-0">
                <div className="flex justify-between">
                  <span className="font-medium truncate max-w-[200px]">{activity.details}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Device: {activity.deviceId.substring(0, 8)}...
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No activity recorded for this user
          </div>
        )}
        
        {activities.length > 4 && (
          <div className="text-center pt-2">
            <Button variant="link" asChild>
              <Link to="/activity">View all activity</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
