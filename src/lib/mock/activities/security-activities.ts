
import { ActivityLog } from '../../types/activity.types';

export const securityActivities: ActivityLog[] = [
  {
    id: "log-002",
    deviceId: "dev-003",
    timestamp: "2023-10-15T07:10:00",
    type: "policy_violation",
    details: "Unauthorized application installation attempt: TikTok",
    severity: "warning"
  },
  {
    id: "log-003",
    deviceId: "dev-005",
    timestamp: "2023-10-15T09:55:00",
    type: "policy_violation",
    details: "Device rooted/jailbroken status detected",
    severity: "critical"
  }
];
