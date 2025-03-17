
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserHeader } from "./UserHeader";
import { UserInfoCard } from "./cards/UserInfoCard";
import { UserDevicesCard } from "./cards/UserDevicesCard";
import { UserActivityCard } from "./cards/UserActivityCard";
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
      <UserHeader
        userId={userId}
        username={username}
        fullName={fullName}
        isActive={isActive}
        lastActive={lastActive}
        onRefreshData={handleRefreshData}
        onSuspendUser={handleSuspendUser}
        onMuteNotifications={handleMuteNotifications}
      />
      
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
