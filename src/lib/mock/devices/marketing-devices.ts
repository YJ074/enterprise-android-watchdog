
import { Device } from '../../types/device.types';

export const marketingDevices: Device[] = [
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
    id: "dev-006",
    name: "iPhone 14-Alex",
    model: "iPhone 14 Pro",
    osVersion: "iOS 16.5",
    lastSeen: "2023-10-15T10:45:00",
    status: "online",
    batteryLevel: 72,
    storageUsed: 112,
    totalStorage: 256,
    user: "Alex Martinez",
    department: "Marketing",
    applications: [
      {
        id: "app-007",
        name: "Canva",
        installDate: "2023-03-12",
        version: "11.24.0",
        size: 245,
        permissions: ["Photos", "Camera"],
        isSystemApp: false
      },
      {
        id: "app-008",
        name: "Hootsuite",
        installDate: "2023-02-28",
        version: "22.10.1",
        size: 187,
        permissions: ["Notifications", "Photos"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-007",
    name: "iPad Pro-Taylor",
    model: "iPad Pro 12.9",
    osVersion: "iPadOS 16.3",
    lastSeen: "2023-10-14T17:20:00",
    status: "offline",
    batteryLevel: 15,
    storageUsed: 345,
    totalStorage: 512,
    user: "Taylor Singh",
    department: "Marketing",
    applications: [
      {
        id: "app-009",
        name: "Adobe Photoshop",
        installDate: "2023-01-05",
        version: "24.1.0",
        size: 1245,
        permissions: ["Photos", "Files"],
        isSystemApp: false
      }
    ]
  }
];
