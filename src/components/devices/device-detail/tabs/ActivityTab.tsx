
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActivityIcon } from "lucide-react";
import { activityLogs } from "@/lib/mock-data";
import { format } from "date-fns";
import { getSeverityBadge, getActivityIcon } from "@/components/activity/utils/activityHelpers";

type ActivityTabProps = {
  deviceId: string;
};

export function ActivityTab({ deviceId }: ActivityTabProps) {
  // Get device specific activities
  const deviceActivities = activityLogs
    .filter(log => log.deviceId === deviceId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  return (
    <div className="p-4 border rounded-md mt-2">
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
    </div>
  );
}
