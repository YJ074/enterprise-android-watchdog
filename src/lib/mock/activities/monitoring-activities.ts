
import { ActivityLog } from '../../types/activity.types';

export const monitoringActivities: ActivityLog[] = [
  {
    id: "log-005",
    deviceId: "dev-001",
    timestamp: "2023-10-15T08:45:00",
    type: "location_change",
    details: "Device location changed to outside approved zone",
    severity: "warning"
  },
  {
    id: "log-015",
    deviceId: "dev-001",
    timestamp: "2023-10-15T17:20:00",
    type: "audio_recording",
    details: "Voice recording created in Voice Recorder app",
    severity: "info",
    metadata: {
      fileType: "mp3",
      fileSize: 1.2,
      duration: 45,
      location: "Internal Storage/Recordings"
    }
  }
];
