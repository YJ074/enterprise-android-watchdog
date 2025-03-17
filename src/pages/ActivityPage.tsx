
import { MainLayout } from "@/components/layout/MainLayout";
import { ActivityList } from "@/components/activity/ActivityList";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ActivityPage = () => {
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Fetching the latest activity logs...",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your activity logs are being exported...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Device Activity</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="rounded-md bg-white p-6 shadow-sm">
          <ActivityList />
        </div>
      </div>
    </MainLayout>
  );
};

export default ActivityPage;
