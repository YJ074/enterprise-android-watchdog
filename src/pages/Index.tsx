
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BarChart3, PackageOpen, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const Index = () => {
  // Mock last update time - in a real app, this would come from your API or data service
  const lastUpdateTime = new Date();
  const { toast } = useToast();
  const [dashboardKey, setDashboardKey] = useState(Date.now());
  
  // Ensure content is visible and active
  useEffect(() => {
    console.log("Index page loaded, ensuring software dashboard is visible");
    
    // Show a welcome toast
    toast({
      title: "Welcome to the Dashboard",
      description: "Loading the Software Management tab...",
    });
    
    // Force the software tab to be selected after a short delay
    const activateTab = () => {
      console.log("Attempting to select software tab");
      const softwareTab = document.querySelector('[value="software"]');
      if (softwareTab instanceof HTMLElement) {
        softwareTab.click();
        console.log("Software tab clicked");
      } else {
        console.log("Software tab element not found, retrying...");
        setTimeout(activateTab, 200); // Try again
      }
    };
    
    // Add a delay to ensure DOM is ready
    setTimeout(activateTab, 500);
  }, [toast, dashboardKey]);

  const refreshView = () => {
    // This will force the Dashboard to re-render
    console.log("Refreshing view");
    setDashboardKey(Date.now());
    toast({
      title: "View Refreshed",
      description: "The dashboard has been refreshed.",
    });
  };

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
              const tab = document.querySelector('[value="metrics"]');
              if (tab instanceof HTMLElement) {
                tab.click();
              }
            }}
          >
            <BarChart3 className="h-4 w-4" />
            View Metrics
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 border-blue-200 hover:bg-blue-50"
            onClick={refreshView}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh View
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              console.log("Software button clicked, activating tab");
              const softwareTab = document.querySelector('[value="software"]');
              if (softwareTab instanceof HTMLElement) {
                softwareTab.click();
                toast({
                  title: "Software Dashboard Activated",
                  description: "Software management view is now active.",
                });
              }
            }}
          >
            <PackageOpen className="h-4 w-4" />
            View Software
          </Button>
        </div>
      </div>
      
      <Dashboard key={dashboardKey} />
    </MainLayout>
  );
};

export default Index;
