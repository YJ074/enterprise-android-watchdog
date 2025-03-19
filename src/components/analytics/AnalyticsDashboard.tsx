
import { DetailedMetricsGrid } from "./DetailedMetricsGrid";
import { HistoricalTrendsChart } from "./HistoricalTrendsChart";
import { ForecastInsights } from "./ForecastInsights";
import { format } from "date-fns";
import { Calendar, DownloadIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function AnalyticsDashboard() {
  const { toast } = useToast();
  const lastUpdateTime = new Date();

  const handleRefresh = () => {
    toast({
      title: "Refreshing data",
      description: "Analytics data is being refreshed...",
    });
    // In a real app, this would trigger an API call to refresh the data
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Your analytics data export is being prepared...",
    });
    // In a real app, this would trigger the export functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Advanced metrics, historical trends, and predictive analytics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm text-muted-foreground mr-2">
            <Calendar className="mr-1 h-4 w-4" />
            Last updated: {format(lastUpdateTime, "PPpp")}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-1 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <DownloadIcon className="mr-1 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <DetailedMetricsGrid />
      
      <div className="grid grid-cols-1 gap-6">
        <HistoricalTrendsChart />
        <ForecastInsights />
      </div>
    </div>
  );
}
