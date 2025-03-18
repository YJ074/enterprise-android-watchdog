
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { UserSync } from "@/components/users/UserSync";

interface UserSyncCardProps {
  syncTab: boolean;
  setSyncTab: (value: boolean) => void;
}

export function UserSyncCard({ syncTab, setSyncTab }: UserSyncCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>User Synchronization</span>
        </CardTitle>
        <CardDescription>
          Configure user synchronization with external systems.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <Label htmlFor="show-sync-settings">Show Synchronization Settings</Label>
            <p className="text-sm text-muted-foreground">
              Configure external system integration for user management.
            </p>
          </div>
          <Switch 
            id="show-sync-settings" 
            checked={syncTab} 
            onCheckedChange={setSyncTab} 
          />
        </div>
        
        {syncTab && <UserSync />}
      </CardContent>
    </Card>
  );
}
