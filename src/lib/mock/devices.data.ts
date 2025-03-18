import { Device } from '../types/device.types';

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
