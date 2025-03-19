
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BarChart3, PackageOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Index = () => {
  // Mock last update time - in a real app, this would come from your API or data service
  const lastUpdateTime = new Date();
  const { toast } = useToast();

  // Show a toast when the page loads to guide the user
  useEffect(() => {
    toast({
      title: "Welcome to the Dashboard",
      description: "The Software Management tab is now visible by default. Explore other tabs using the navigation above.",
    });
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-gray-500">
          Last data update: {format(lastUpdateTime, "PPpp")}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => {
              // Find the metrics tab and click it programmatically
              const metricsTab = document.querySelector('[value="metrics"]');
              if (metricsTab instanceof HTMLElement) {
                metricsTab.click();
              }
            }}
          >
            <BarChart3 className="h-4 w-4" />
            View Metrics
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 animate-pulse"
            onClick={() => {
              // Find the software tab and click it programmatically
              const softwareTab = document.querySelector('[value="software"]');
              if (softwareTab instanceof HTMLElement) {
                softwareTab.click();
              } else {
                toast({
                  title: "Software tab not found",
                  description: "Please try refreshing the page.",
                  variant: "destructive"
                });
              }
            }}
          >
            <PackageOpen className="h-4 w-4" />
            View Software
          </Button>
        </div>
      </div>
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
