
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
  const [isVisible, setIsVisible] = useState(false);

  // Ensure content is visible and active
  useEffect(() => {
    // Show a welcome toast
    toast({
      title: "Welcome to the Dashboard",
      description: "The Software Management tab is now visible. If you don't see content, click Refresh View.",
    });
    
    // Force the software tab to be selected after the component mounts
    setTimeout(() => {
      const softwareTab = document.querySelector('[value="software"]');
      if (softwareTab instanceof HTMLElement) {
        softwareTab.click();
        setIsVisible(true);
      }
    }, 100);
  }, [toast]);

  const refreshView = () => {
    // This will force the Dashboard to re-render
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      toast({
        title: "View Refreshed",
        description: "The dashboard has been refreshed with Software view.",
      });
      
      // Make sure software tab is active
      const softwareTab = document.querySelector('[value="software"]');
      if (softwareTab instanceof HTMLElement) {
        softwareTab.click();
      }
    }, 100);
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
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={refreshView}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh View
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 animate-pulse"
            onClick={() => {
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
      <Dashboard key={isVisible ? "visible" : "hidden"} />
    </MainLayout>
  );
};

export default Index;
