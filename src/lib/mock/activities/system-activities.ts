
import { ActivityLog } from '../../types/activity.types';

export const systemActivities: ActivityLog[] = [
  {
    id: "log-001",
    deviceId: "dev-001",
    timestamp: "2023-10-15T08:25:00",
    type: "login",
    details: "User logged in successfully",
    severity: "info"
  },
  {
    id: "log-006",
    deviceId: "dev-004",
    timestamp: "2023-10-13T16:15:00",
    type: "logout",
    details: "User logged out",
    severity: "info"
  }
];
