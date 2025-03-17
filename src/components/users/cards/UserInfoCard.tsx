
import React from "react";

interface UserInfoCardProps {
  userId: string;
  username: string;
  fullName: string;
  isActive: boolean;
}

export function UserInfoCard({ userId, username, fullName, isActive }: UserInfoCardProps) {
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
