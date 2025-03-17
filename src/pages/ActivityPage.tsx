
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ActivityList } from "@/components/activity/ActivityList";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Calendar, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const ActivityPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });
  
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

  const handleDateSelect = (date: Date | undefined) => {
    setDateRange(prev => {
      if (!prev.from) {
        return { from: date, to: undefined };
      } else if (!prev.to && date && date > prev.from) {
        return { from: prev.from, to: date };
      } else {
        return { from: date, to: undefined };
      }
    });
  };

  const clearDateRange = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Device Activity</h1>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "Date Range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-3 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Select date range</h4>
                    <Button variant="ghost" size="sm" onClick={clearDateRange}>
                      Reset
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {!dateRange.from && "Select start date"}
                    {dateRange.from && !dateRange.to && "Select end date"}
                  </p>
                </div>
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => setDateRange({
                    from: range?.from,
                    to: range?.to
                  })}
                  numberOfMonths={1}
                  defaultMonth={new Date()}
                />
              </PopoverContent>
            </Popover>

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

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="system">System Events</TabsTrigger>
            <TabsTrigger value="user">User Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="rounded-md bg-white p-6 shadow-sm">
            <ActivityList 
              activeTab={activeTab} 
              dateRange={dateRange}
            />
          </TabsContent>
          
          <TabsContent value="security" className="rounded-md bg-white p-6 shadow-sm">
            <ActivityList 
              activeTab={activeTab} 
              dateRange={dateRange}
            />
          </TabsContent>
          
          <TabsContent value="system" className="rounded-md bg-white p-6 shadow-sm">
            <ActivityList 
              activeTab={activeTab} 
              dateRange={dateRange}
            />
          </TabsContent>
          
          <TabsContent value="user" className="rounded-md bg-white p-6 shadow-sm">
            <ActivityList 
              activeTab={activeTab} 
              dateRange={dateRange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ActivityPage;
