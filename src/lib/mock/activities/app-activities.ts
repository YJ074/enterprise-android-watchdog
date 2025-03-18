
import { ActivityLog } from '../../types/activity.types';

export const appActivities: ActivityLog[] = [
  {
    id: "log-004",
    deviceId: "dev-002",
    timestamp: "2023-10-15T09:30:00",
    type: "app_install",
    details: "Installed application: Zoom",
    severity: "info"
  },
  {
    id: "log-007",
    deviceId: "dev-002",
    timestamp: "2023-10-15T09:40:00",
    type: "app_uninstall",
    details: "Uninstalled application: WhatsApp",
    severity: "info"
  }
];
