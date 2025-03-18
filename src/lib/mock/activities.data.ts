
import { systemActivities } from './activities/system-activities';
import { appActivities } from './activities/app-activities';
import { securityActivities } from './activities/security-activities';
import { monitoringActivities } from './activities/monitoring-activities';
import { ActivityLog } from '../types/activity.types';

export const activityLogs: ActivityLog[] = [
  ...systemActivities,
  ...appActivities,
  ...securityActivities,
  ...monitoringActivities
];
