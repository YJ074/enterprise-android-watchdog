
import React, { useState } from 'react';
import { useInvestigationConsole } from "@/components/investigation/hooks/useInvestigationConsole";
import { InvestigationResults } from "@/components/investigation/InvestigationResults";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { LogTypeSelector } from "@/components/investigation/LogTypeSelector";
import { DateRangePicker } from "@/components/investigation/DateRangePicker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InvestigationContentProps {
  deviceId: string;
}

export const InvestigationContent: React.FC<InvestigationContentProps> = ({ deviceId }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedLogTypes,
    setSelectedLogTypes,
    dateRange,
    setDateRange,
    searchTarget,
    setSearchTarget,
    logs,
    isSearching,
    handleSubmit
  } = useInvestigationConsole(deviceId);
  
  const [activeTab, setActiveTab] = useState<string>("search");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Investigation</CardTitle>
        <CardDescription>
          Search and analyze logs for this device
        </CardDescription>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Logs</TabsTrigger>
            <TabsTrigger value="new">New Investigation</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {activeTab === "search" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  className="pl-8"
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Log Types</p>
                <LogTypeSelector
                  selectedLogTypes={selectedLogTypes}
                  onChange={setSelectedLogTypes}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Date Range</p>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
              </div>
            </div>
            
            <InvestigationResults logs={logs} isLoading={isSearching} />
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-8 flex flex-col items-center justify-center border rounded-md border-dashed">
              <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Create New Investigation</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Create a detailed investigation for this device with expanded options for monitoring and analysis
              </p>
              <Button>Start New Investigation</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Standard Investigation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm pt-0">
                  Collect and analyze device logs to identify issues or security concerns
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Forensic Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-sm pt-0">
                  Deep investigation for security incidents or compliance violations
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Performance Audit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm pt-0">
                  Analyze device performance metrics and identify optimization opportunities
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Custom Investigation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm pt-0">
                  Create a tailored investigation with custom parameters and focus areas
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
