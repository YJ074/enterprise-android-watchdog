
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserDevicesCardProps {
  devices: any[];
}

export function UserDevicesCard({ devices }: UserDevicesCardProps) {
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
