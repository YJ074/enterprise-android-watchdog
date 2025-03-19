
import React, { useState } from 'react';
import { useInvestigationConsole } from "@/components/investigation/hooks/useInvestigationConsole";
import { InvestigationResults } from "@/components/investigation/InvestigationResults";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, FileText, Shield, Activity, Cpu } from "lucide-react";
import { LogTypeSelector } from "@/components/investigation/LogTypeSelector";
import { DateRangePicker } from "@/components/investigation/DateRangePicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InvestigationSearchForm } from "@/components/investigation/form-fields/InvestigationSearchForm";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [selectedInvestigationType, setSelectedInvestigationType] = useState<string | null>(null);
  
  const handleInvestigationTypeSelect = (type: string) => {
    setSelectedInvestigationType(type);
  };
  
  return (
    <Card className="shadow-md border-gray-200">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Device Investigation
        </CardTitle>
        <CardDescription className="text-base">
          Search and analyze logs for this device to identify potential issues or security concerns
        </CardDescription>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search Logs
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Investigation
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        <TabsContent value="search" className="mt-0">
          <InvestigationSearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLogTypes={selectedLogTypes}
            setSelectedLogTypes={setSelectedLogTypes}
            dateRange={dateRange}
            setDateRange={setDateRange}
            searchTarget={searchTarget}
            setSearchTarget={setSearchTarget}
            isSearching={isSearching}
            onSubmit={handleSubmit}
            deviceId={deviceId}
          />
          
          <div className="mt-6">
            <InvestigationResults logs={logs} isLoading={isSearching} deviceId={deviceId} />
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-0 space-y-6">
          <div className="p-8 flex flex-col items-center justify-center border rounded-md border-dashed bg-gray-50 animate-fade-in">
            <PlusCircle className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Create New Investigation</h3>
            <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
              Create a detailed investigation for this device with expanded options for monitoring and analysis. 
              Select an investigation type below to get started.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Start New Investigation
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className={`cursor-pointer hover:shadow-md transition-all ${selectedInvestigationType === 'standard' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleInvestigationTypeSelect('standard')}
                  >
                    <CardHeader className="pb-2 flex flex-row items-start space-y-0">
                      <div className="mr-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Standard Investigation</CardTitle>
                        <CardDescription className="text-xs pt-1">Recommended for routine checks</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm pt-0">
                      Collect and analyze device logs to identify issues or security concerns
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Basic device log analysis with predefined queries</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className={`cursor-pointer hover:shadow-md transition-all ${selectedInvestigationType === 'forensic' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleInvestigationTypeSelect('forensic')}
                  >
                    <CardHeader className="pb-2 flex flex-row items-start space-y-0">
                      <div className="mr-2">
                        <Shield className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Forensic Analysis</CardTitle>
                        <CardDescription className="text-xs pt-1">
                          <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-200">Advanced</Badge>
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm pt-0">
                      Deep investigation for security incidents or compliance violations
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>In-depth analysis with file system access and deleted data recovery</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className={`cursor-pointer hover:shadow-md transition-all ${selectedInvestigationType === 'performance' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleInvestigationTypeSelect('performance')}
                  >
                    <CardHeader className="pb-2 flex flex-row items-start space-y-0">
                      <div className="mr-2">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Performance Audit</CardTitle>
                        <CardDescription className="text-xs pt-1">Resource usage insights</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm pt-0">
                      Analyze device performance metrics and identify optimization opportunities
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>CPU, memory, and storage usage patterns with bottleneck detection</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className={`cursor-pointer hover:shadow-md transition-all ${selectedInvestigationType === 'custom' ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleInvestigationTypeSelect('custom')}
                  >
                    <CardHeader className="pb-2 flex flex-row items-start space-y-0">
                      <div className="mr-2">
                        <Cpu className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Custom Investigation</CardTitle>
                        <CardDescription className="text-xs pt-1">Fully configurable</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm pt-0">
                      Create a tailored investigation with custom parameters and focus areas
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Build your own investigation with custom queries and data sources</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};
