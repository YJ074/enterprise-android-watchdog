
import { MainLayout } from "@/components/layout/MainLayout";
import { DeviceListTable } from "@/components/devices/DeviceListTable";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Download } from "lucide-react";

const DevicesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Managed Devices</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
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
