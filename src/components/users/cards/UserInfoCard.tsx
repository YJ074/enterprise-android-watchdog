
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, User, Info } from "lucide-react";

interface UserInfoCardProps {
  userId: string;
  username: string;
  fullName: string;
  isActive: boolean;
  role?: string;
  createdAt?: string;
}

export function UserInfoCard({ 
  userId, 
  username, 
  fullName, 
  isActive, 
  role = "User",
  createdAt = "3 months ago" 
}: UserInfoCardProps) {
  const getRoleBadge = () => {
    switch(role.toLowerCase()) {
      case 'admin':
        return <Badge className="bg-red-500">Admin</Badge>;
      case 'security-admin':
        return <Badge className="bg-amber-500">Security Admin</Badge>;
      case 'device-manager':
        return <Badge className="bg-blue-500">Device Manager</Badge>;
      case 'support':
        return <Badge className="bg-green-500">Support</Badge>;
      case 'auditor':
        return <Badge className="bg-purple-500">Auditor</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 cursor-help">
                  <span className="font-medium text-xs truncate max-w-[150px]">{userId}</span>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Unique identifier for this user</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground flex items-center gap-1">
            <User className="h-3 w-3" /> 
            User Role:
          </span>
          <span className="font-medium flex items-center gap-1">
            {getRoleBadge()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created:</span>
          <span className="font-medium">{createdAt}</span>
        </div>
      </div>
    </div>
  );
}
