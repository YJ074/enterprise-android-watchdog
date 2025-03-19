import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DeviceListTable } from "@/components/devices/DeviceListTable";
import { BulkOperationsBar } from "@/components/devices/BulkOperationsBar";
import { AddDeviceDialog } from "@/components/devices/AddDeviceDialog";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Download } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Device } from "@/lib/types/device.types";
import { NewDevice } from "@/hooks/devices/types";

const DevicesPage = () => {
  const { devices, isLoading, error, handleRefresh, addDevice, updateDevice, deleteDevice } = useDevices();
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  
  const handleSelectDevice = (device: Device, isSelected: boolean) => {
    if (isSelected) {
      setSelectedDevices([...selectedDevices, device]);
    } else {
      setSelectedDevices(selectedDevices.filter(d => d.id !== device.id));
    }
  };
  
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedDevices([...devices]);
    } else {
      setSelectedDevices([]);
    }
  };
  
  const handleClearSelection = () => {
    setSelectedDevices([]);
  };
  
  const handleBulkUpdateDevices = (deviceIds: string[], updates: Partial<Device>) => {
    deviceIds.forEach(id => {
      updateDevice({ id, ...updates });
    });
  };
  
  const handleBulkDeleteDevices = (deviceIds: string[]) => {
    deviceIds.forEach(id => {
      deleteDevice(id);
    });
  };
  
  const handleExport = (devicesToExport: Device[] = devices) => {
    // Create a CSV of device data
    const headers = ["ID", "Name", "Model", "OS Version", "User", "Department", "Status", "Last Seen", "Battery"];
    const csvData = devicesToExport.map(device => [
      device.id,
      device.name,
      device.model,
      device.osVersion,
      device.user,
      device.department,
      device.status,
      device.lastSeen,
      `${device.batteryLevel}%`
    ]);
    
    // Create and download CSV file
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `devices_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create a handler function to map between the database NewDevice type and the application Device type
  const handleAddDevice = (newDevice: NewDevice) => {
    // Map from database schema fields to application model fields
    const mappedDevice: Omit<Device, "id"> = {
      name: newDevice.name,
      model: newDevice.model,
      osVersion: newDevice.os_version,
      lastSeen: newDevice.last_seen || new Date().toISOString(),
      status: newDevice.status || 'offline',
      batteryLevel: newDevice.battery_level || 100,
      storageUsed: newDevice.storage_used || 0,
      totalStorage: newDevice.total_storage || 128,
      user: newDevice.user_id,
      department: newDevice.department,
      applications: [],
      location: newDevice.location_latitude && newDevice.location_longitude ? {
        latitude: newDevice.location_latitude,
        longitude: newDevice.location_longitude,
        address: newDevice.location_address || ''
      } : undefined
    };
    
    addDevice(mappedDevice);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Managed Devices</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport()} disabled={isLoading || devices.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <AddDeviceDialog 
              trigger={
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              }
              onDeviceAdded={handleAddDevice}
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading devices: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Bulk Operations Bar */}
        <BulkOperationsBar 
          selectedDevices={selectedDevices}
          clearSelection={handleClearSelection}
          onUpdateDevices={handleBulkUpdateDevices}
          onDeleteDevices={handleBulkDeleteDevices}
          onExportDevices={handleExport}
        />

        <div className="rounded-md bg-white p-6 shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <DeviceListTable 
              devices={devices} 
              selectedDevices={selectedDevices}
              onSelectDevice={handleSelectDevice}
              onSelectAll={handleSelectAll}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DevicesPage;
