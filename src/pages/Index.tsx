
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Index = () => {
  // Mock last update time - in a real app, this would come from your API or data service
  const lastUpdateTime = new Date();

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-gray-500">
          Last data update: {format(lastUpdateTime, "PPpp")}
        </div>
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
      </div>
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
