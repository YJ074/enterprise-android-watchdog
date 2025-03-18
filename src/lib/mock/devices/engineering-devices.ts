
import { Device } from '../../types/device.types';

export const engineeringDevices: Device[] = [
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
    id: "dev-008",
    name: "MacBook Pro-Raj",
    model: "MacBook Pro 16",
    osVersion: "macOS 13.2",
    lastSeen: "2023-10-15T11:30:00",
    status: "online",
    batteryLevel: 89,
    storageUsed: 456,
    totalStorage: 1024,
    user: "Raj Patel",
    department: "Engineering",
    applications: [
      {
        id: "app-010",
        name: "Visual Studio Code",
        installDate: "2023-01-10",
        version: "1.83.1",
        size: 324,
        permissions: ["Files", "Network"],
        isSystemApp: false
      },
      {
        id: "app-011",
        name: "Docker Desktop",
        installDate: "2023-02-18",
        version: "4.24.0",
        size: 687,
        permissions: ["System", "Network"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-009",
    name: "ThinkPad-Julia",
    model: "Lenovo ThinkPad X1",
    osVersion: "Windows 11 Pro",
    lastSeen: "2023-10-15T08:15:00",
    status: "warning",
    batteryLevel: 42,
    storageUsed: 378,
    totalStorage: 512,
    user: "Julia Kim",
    department: "Engineering",
    applications: [
      {
        id: "app-012",
        name: "IntelliJ IDEA",
        installDate: "2023-03-05",
        version: "2023.2.3",
        size: 892,
        permissions: ["Files", "Network"],
        isSystemApp: false
      }
    ]
  }
];
