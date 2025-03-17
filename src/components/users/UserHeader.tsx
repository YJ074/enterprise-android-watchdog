
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Ban, User, Bell } from "lucide-react";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface UserHeaderProps {
  userId: string;
  username: string;
  fullName: string;
  isActive: boolean;
  lastActive: Date | null;
  onRefreshData: () => void;
  onSuspendUser: () => void;
  onMuteNotifications: () => void;
}

export function UserHeader({
  userId,
  username,
  fullName,
  isActive,
  lastActive,
  onRefreshData,
  onSuspendUser,
  onMuteNotifications
}: UserHeaderProps) {
  return (
    <>
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
          <Button variant="outline" onClick={onMuteNotifications}>
            <Bell className="h-4 w-4 mr-2" />
            Mute Notifications
          </Button>
          <Button 
            variant={isActive ? "destructive" : "outline"} 
            onClick={onSuspendUser}
          >
            <Ban className="h-4 w-4 mr-2" />
            {isActive ? 'Suspend User' : 'Activate User'}
          </Button>
          <Button variant="outline" onClick={onRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    </>
  );
}
