
import { useParams, Link } from "react-router-dom";
import { useDevice } from "@/hooks/useDevices";
import { LogsTable } from "./LogsTable";
import { DeviceInfoBanner } from "./DeviceInfoBanner";
import { InvestigationSearchForm } from "./form-fields/InvestigationSearchForm";
import { useInvestigationConsole } from "./hooks/useInvestigationConsole";
import { InvestigationResults } from "./InvestigationResults";
import { Button } from "@/components/ui/button";
import { Home, PackageOpen } from "lucide-react";

export function InvestigationConsole() {
  const { id: deviceId } = useParams<{ id: string }>();
  const { device } = useDevice(deviceId);
  
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
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Investigation Console</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">
              <PackageOpen className="h-4 w-4 mr-2" />
              Software Dashboard
            </Link>
          </Button>
        </div>
      </div>
    
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
      
      {device && <DeviceInfoBanner device={device} />}
      
      <InvestigationResults logs={logs} isLoading={isSearching} deviceId={deviceId} />
    </div>
  );
}
