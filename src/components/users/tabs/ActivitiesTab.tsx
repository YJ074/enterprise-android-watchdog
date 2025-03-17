
import { useState } from "react";
import { activityLogs, devices } from "@/lib/mock-data";
import { ActivityList } from "@/components/activity/ActivityList";

type ActivitiesTabProps = {
  userId: string;
};

export function ActivitiesTab({ userId }: ActivitiesTabProps) {
  // Get all devices associated with this user
  const userDevices = devices.filter(device => device.user === userId);
  
  // Get all activity logs for this user's devices
  const userActivities = activityLogs.filter(log => 
    userDevices.some(device => device.id === log.deviceId)
  );
  
  // For demo purposes, create a date range for the last week
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: lastWeek,
    to: today
  });

  return (
    <div className="p-4 border rounded-md mt-2">
      <ActivityList
        activeTab="all"
        dateRange={dateRange}
      />
    </div>
  );
}
