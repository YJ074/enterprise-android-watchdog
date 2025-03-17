
export interface Device {
  id: string;
  name: string;
  model: string;
  osVersion: string;
  lastSeen: string;
  status: 'online' | 'offline' | 'warning' | 'compromised';
  batteryLevel: number;
  storageUsed: number;
  totalStorage: number;
  user: string;
  department: string;
  applications: Application[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Application {
  id: string;
  name: string;
  installDate: string;
  version: string;
  size: number;
  permissions: string[];
  isSystemApp: boolean;
}

export interface ActivityLog {
  id: string;
  deviceId: string;
  timestamp: string;
  type: 'app_install' | 'app_uninstall' | 'login' | 'logout' | 'location_change' | 
        'policy_violation' | 'system_update' | 'whatsapp_message' | 'gmail_access' | 
        'call_recorded' | 'screenshot' | 'keylogger' | 'browsing_history' | 'file_access';
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface MetricData {
  name: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}

export const devices: Device[] = [
  {
    id: "dev-001",
    name: "Galaxy S23-Emma",
    model: "Samsung Galaxy S23",
    osVersion: "Android 13",
    lastSeen: "2023-10-15T08:30:00",
    status: "online",
    batteryLevel: 87,
    storageUsed: 64,
    totalStorage: 128,
    user: "Emma Johnson",
    department: "Marketing",
    applications: [
      {
        id: "app-001",
        name: "Gmail",
        installDate: "2023-01-15",
        version: "2023.10.08",
        size: 156,
        permissions: ["Contacts", "Storage", "Camera"],
        isSystemApp: false
      },
      {
        id: "app-002",
        name: "Chrome",
        installDate: "2023-01-15",
        version: "118.0.5993.65",
        size: 234,
        permissions: ["Location", "Storage", "Camera"],
        isSystemApp: true
      }
    ],
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: "San Francisco, CA"
    }
  },
  {
    id: "dev-002",
    name: "Pixel 7-Marcus",
    model: "Google Pixel 7",
    osVersion: "Android 14",
    lastSeen: "2023-10-15T09:45:00",
    status: "offline",
    batteryLevel: 23,
    storageUsed: 187,
    totalStorage: 256,
    user: "Marcus Chen",
    department: "Engineering",
    applications: [
      {
        id: "app-003",
        name: "Slack",
        installDate: "2023-03-22",
        version: "23.10.10.0",
        size: 198,
        permissions: ["Contacts", "Storage", "Microphone"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-003",
    name: "OnePlus 11-Sarah",
    model: "OnePlus 11",
    osVersion: "Android 13",
    lastSeen: "2023-10-15T07:15:00",
    status: "warning",
    batteryLevel: 45,
    storageUsed: 45,
    totalStorage: 128,
    user: "Sarah Garcia",
    department: "Sales",
    applications: [
      {
        id: "app-004",
        name: "Salesforce",
        installDate: "2023-05-18",
        version: "244.2",
        size: 312,
        permissions: ["Contacts", "Location", "Calendar"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-004",
    name: "Galaxy Tab-James",
    model: "Samsung Galaxy Tab S9",
    osVersion: "Android 13",
    lastSeen: "2023-10-13T16:20:00",
    status: "offline",
    batteryLevel: 0,
    storageUsed: 98,
    totalStorage: 256,
    user: "James Wilson",
    department: "Executive",
    applications: [
      {
        id: "app-005",
        name: "Microsoft Office",
        installDate: "2023-02-11",
        version: "16.0.16728.20116",
        size: 456,
        permissions: ["Storage", "Contacts"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-005",
    name: "Pixel 6a-Aisha",
    model: "Google Pixel 6a",
    osVersion: "Android 13",
    lastSeen: "2023-10-15T10:10:00",
    status: "compromised",
    batteryLevel: 62,
    storageUsed: 56,
    totalStorage: 128,
    user: "Aisha Patel",
    department: "Customer Support",
    applications: [
      {
        id: "app-006",
        name: "Zendesk",
        installDate: "2023-06-01",
        version: "23.10.1",
        size: 178,
        permissions: ["Contacts", "Storage", "Microphone", "Camera"],
        isSystemApp: false
      }
    ]
  }
];

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
  }
];

export const metrics: MetricData[] = [
  {
    name: "Active Devices",
    value: 42,
    change: 8,
    changeType: "positive"
  },
  {
    name: "Compliance Rate",
    value: 94,
    change: 2,
    changeType: "positive"
  },
  {
    name: "Policy Violations",
    value: 7,
    change: 3,
    changeType: "negative"
  },
  {
    name: "Pending Updates",
    value: 12,
    change: 5,
    changeType: "negative"
  }
];
