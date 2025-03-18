import { ActivityLog } from '../types/activity.types';

export const activityLogs: ActivityLog[] = [
  {
    id: "log-001",
    deviceId: "dev-001",
    timestamp: "2023-10-15T08:25:00",
    type: "login",
    details: "User logged in successfully",
    severity: "info"
  },
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
  },
  {
    id: "log-004",
    deviceId: "dev-002",
    timestamp: "2023-10-15T09:30:00",
    type: "app_install",
    details: "Installed application: Zoom",
    severity: "info"
  },
  {
    id: "log-005",
    deviceId: "dev-001",
    timestamp: "2023-10-15T08:45:00",
    type: "location_change",
    details: "Device location changed to outside approved zone",
    severity: "warning"
  },
  {
    id: "log-006",
    deviceId: "dev-004",
    timestamp: "2023-10-13T16:15:00",
    type: "logout",
    details: "User logged out",
    severity: "info"
  },
  {
    id: "log-007",
    deviceId: "dev-002",
    timestamp: "2023-10-15T09:40:00",
    type: "app_uninstall",
    details: "Uninstalled application: WhatsApp",
    severity: "info"
  },
  // Let's add some example entries for our new activity types
  {
    id: "log-008",
    deviceId: "dev-001",
    timestamp: "2023-10-15T10:15:00",
    type: "whatsapp_message",
    details: "WhatsApp message sent to John Doe at 10:15 AM",
    severity: "info"
  },
  {
    id: "log-009",
    deviceId: "dev-003",
    timestamp: "2023-10-15T11:30:00",
    type: "gmail_access",
    details: "Gmail account accessed in Chrome browser",
    severity: "info"
  },
  {
    id: "log-010",
    deviceId: "dev-005",
    timestamp: "2023-10-15T12:45:00",
    type: "call_recorded",
    details: "Phone call recorded with +1-555-123-4567 for 15 minutes",
    severity: "info"
  },
  {
    id: "log-011",
    deviceId: "dev-002",
    timestamp: "2023-10-15T13:20:00",
    type: "screenshot",
    details: "Screenshot captured while using Facebook app",
    severity: "info"
  },
  {
    id: "log-012",
    deviceId: "dev-004",
    timestamp: "2023-10-15T14:10:00",
    type: "keylogger",
    details: "Keystrokes recorded in password field on banking website",
    severity: "warning"
  },
  {
    id: "log-013",
    deviceId: "dev-001",
    timestamp: "2023-10-15T15:05:00",
    type: "browsing_history",
    details: "Visited restricted website in Chrome browser",
    severity: "warning"
  },
  {
    id: "log-014",
    deviceId: "dev-003",
    timestamp: "2023-10-15T16:30:00",
    type: "file_access",
    details: "Accessed confidential company document from Downloads folder",
    severity: "critical"
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
  },
  {
    id: "log-016",
    deviceId: "dev-002",
    timestamp: "2023-10-15T18:10:00",
    type: "video_recording",
    details: "Video recorded using Camera app",
    severity: "info",
    metadata: {
      fileType: "mp4",
      fileSize: 25.7,
      duration: 118,
      location: "Internal Storage/DCIM/Camera"
    }
  },
  {
    id: "log-017",
    deviceId: "dev-003",
    timestamp: "2023-10-15T19:05:00",
    type: "photo_captured",
    details: "Photo taken using Camera app",
    severity: "info",
    metadata: {
      fileType: "jpg",
      fileSize: 3.5,
      location: "Internal Storage/DCIM/Camera"
    }
  },
  {
    id: "log-018",
    deviceId: "dev-001",
    timestamp: "2023-10-15T20:15:00",
    type: "media_shared",
    details: "Video shared via WhatsApp",
    severity: "warning",
    metadata: {
      fileType: "mp4",
      fileSize: 15.3,
      destination: "Contact: Sarah Johnson",
      location: "Internal Storage/WhatsApp/Media"
    }
  },
  {
    id: "log-019",
    deviceId: "dev-005",
    timestamp: "2023-10-15T21:30:00",
    type: "file_downloaded",
    details: "PDF document downloaded from Chrome browser",
    severity: "warning",
    metadata: {
      fileType: "pdf",
      fileSize: 8.2,
      location: "Internal Storage/Download"
    }
  }
];
