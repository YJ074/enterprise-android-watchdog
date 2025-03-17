
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserActivityCardProps {
  activities: any[];
}

export function UserActivityCard({ activities }: UserActivityCardProps) {
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
