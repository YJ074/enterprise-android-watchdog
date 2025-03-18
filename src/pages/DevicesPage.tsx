
import { MainLayout } from "@/components/layout/MainLayout";
import { DeviceListTable } from "@/components/devices/DeviceListTable";
import { AddDeviceDialog } from "@/components/devices/AddDeviceDialog";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Download } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const DevicesPage = () => {
  const { devices, isLoading, error, handleRefresh, addDevice } = useDevices();
  
  const handleExport = () => {
    // Create a CSV of device data
    const headers = ["ID", "Name", "Model", "OS Version", "User", "Department", "Status", "Last Seen", "Battery"];
    const csvData = devices.map(device => [
      device.id,
      device.name,
      device.model,
      device.os_version,
      device.user_id,
      device.department,
      device.status,
      device.last_seen,
      `${device.battery_level}%`
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Managed Devices</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={isLoading || devices.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export
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
              onDeviceAdded={addDevice}
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
            <DeviceListTable devices={devices} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DevicesPage;
