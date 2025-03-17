
import { MainLayout } from "@/components/layout/MainLayout";
import { DeviceListTable } from "@/components/devices/DeviceListTable";
import { AddDeviceDialog } from "@/components/devices/AddDeviceDialog";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DevicesPage = () => {
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest device information...",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your device data is being exported...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Managed Devices</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <AddDeviceDialog 
              trigger={
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              }
            />
          </div>
        </div>

        <div className="rounded-md bg-white p-6 shadow-sm">
          <DeviceListTable />
        </div>
      </div>
    </MainLayout>
  );
};

export default DevicesPage;
