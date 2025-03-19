
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Calendar, FileSearch, Filter, Download, Printer, BarChart4, Smartphone, MessagesSquare, Mail, Download as DownloadIcon } from "lucide-react";
import { DateRangePicker } from "./DateRangePicker";
import { toast } from "sonner";

export function InvestigationConsole() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("communications");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    communications: true,
    media: true,
    applications: true,
    locations: true
  });
  
  // Mock data for the investigation results
  const mockResults = {
    communications: [
      { id: "1", type: "whatsapp_message", timestamp: "2023-06-15T14:32:21", user: "John Doe", content: "Meeting rescheduled to 3 PM", device: "Galaxy S21" },
      { id: "2", type: "call_log", timestamp: "2023-06-15T16:02:45", user: "Jane Smith", content: "Outgoing call - 5 minutes", device: "iPhone 13" },
      { id: "3", type: "email", timestamp: "2023-06-16T09:15:33", user: "Alex Johnson", content: "Quarterly Report Draft", device: "MacBook Pro" },
      { id: "4", type: "whatsapp_call", timestamp: "2023-06-16T11:45:02", user: "Sarah Wilson", content: "Incoming call - 12 minutes", device: "Pixel 6" },
      { id: "5", type: "sms", timestamp: "2023-06-16T13:22:17", user: "Mark Brown", content: "Please check your email", device: "iPhone 12" }
    ],
    media: [
      { id: "1", type: "screenshot", timestamp: "2023-06-15T15:32:21", user: "John Doe", content: "Login screen", device: "Windows Laptop" },
      { id: "2", type: "photo", timestamp: "2023-06-15T17:12:45", user: "Jane Smith", content: "Document photo", device: "iPhone 13" },
      { id: "3", type: "video", timestamp: "2023-06-16T10:15:33", user: "Alex Johnson", content: "Conference recording", device: "MacBook Pro" }
    ],
    social: [
      { id: "1", type: "facebook", timestamp: "2023-06-15T14:32:21", user: "John Doe", content: "Posted new status", device: "Galaxy S21" },
      { id: "2", type: "instagram", timestamp: "2023-06-15T16:02:45", user: "Jane Smith", content: "Uploaded new photo", device: "iPhone 13" },
      { id: "3", type: "twitter", timestamp: "2023-06-16T09:15:33", user: "Alex Johnson", content: "Sent direct message", device: "MacBook Pro" }
    ]
  };

  const handleStartInvestigation = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      toast.success("Investigation complete", {
        description: `Found results related to "${searchQuery}"`
      });
    }, 1500);
  };
  
  const handleExportData = (format: 'pdf' | 'csv') => {
    toast.success(`Exporting data as ${format.toUpperCase()}`, {
      description: "Your export will be ready shortly"
    });
  };
  
  const handleGenerateReport = () => {
    toast.success("Generating investigation report", {
      description: "A comprehensive report will be available soon"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Advanced Investigation Console</CardTitle>
          <CardDescription>
            Search and analyze communication logs, media files, and other device activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by keyword, user, device ID, or content..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <DateRangePicker />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, communications: !prev.communications }))}>
                <MessagesSquare className="h-3 w-3 mr-1" />
                Communications {filters.communications ? "✓" : ""}
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, media: !prev.media }))}>
                <FileSearch className="h-3 w-3 mr-1" />
                Media Files {filters.media ? "✓" : ""}
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, applications: !prev.applications }))}>
                <Smartphone className="h-3 w-3 mr-1" />
                Applications {filters.applications ? "✓" : ""}
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, locations: !prev.locations }))}>
                <Calendar className="h-3 w-3 mr-1" />
                Location History {filters.locations ? "✓" : ""}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <Button onClick={handleStartInvestigation} disabled={isSearching}>
                {isSearching ? "Searching..." : "Start Investigation"}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExportData('csv')}>
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportData('pdf')}>
                  <Printer className="h-4 w-4 mr-1" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleGenerateReport}>
                  <BarChart4 className="h-4 w-4 mr-1" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Investigation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="communications" onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="communications">
                <MessagesSquare className="h-4 w-4 mr-2" />
                Communications
              </TabsTrigger>
              <TabsTrigger value="media">
                <FileSearch className="h-4 w-4 mr-2" />
                Media Files
              </TabsTrigger>
              <TabsTrigger value="social">
                <Mail className="h-4 w-4 mr-2" />
                Social Media
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="communications" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {mockResults.communications.map(item => (
                    <div key={item.id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between">
                        <Badge variant="outline">{item.type.replace('_', ' ')}</Badge>
                        <span className="text-sm text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">{item.user}</div>
                        <p className="text-sm mt-1">{item.content}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Device: {item.device}</span>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="media" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {mockResults.media.map(item => (
                    <div key={item.id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between">
                        <Badge variant="outline">{item.type}</Badge>
                        <span className="text-sm text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">{item.user}</div>
                        <p className="text-sm mt-1">{item.content}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Device: {item.device}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="social" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {mockResults.social.map(item => (
                    <div key={item.id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between">
                        <Badge variant="outline">{item.type}</Badge>
                        <span className="text-sm text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">{item.user}</div>
                        <p className="text-sm mt-1">{item.content}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Device: {item.device}</span>
                          <Button variant="ghost" size="sm">View Activity</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
