
import { useParams } from "react-router-dom";
import { useDevice } from "@/hooks/useDevices";
import { LogsTable } from "./LogsTable";
import { DeviceInfoBanner } from "./DeviceInfoBanner";
import { InvestigationSearchForm } from "./form-fields/InvestigationSearchForm";
import { useInvestigationConsole } from "./hooks/useInvestigationConsole";

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
      
      <DeviceInfoBanner device={device} />
      
      <LogsTable logs={logs} isLoading={isSearching} />
    </div>
  );
}
