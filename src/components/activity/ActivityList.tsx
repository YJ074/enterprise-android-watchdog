
import { activityLogs } from "@/lib/mock-data";
import { useActivityFilters } from "./useActivityFilters";
import { SearchAndFilterBar } from "./filters/SearchAndFilterBar";
import { ActivityTable } from "./ActivityTable";
import { ActivityPagination } from "./ActivityPagination";

interface ActivityListProps {
  activeTab?: string;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function ActivityList({ activeTab = "all", dateRange }: ActivityListProps) {
  const {
    paginatedLogs,
    filteredLogs,
    page,
    setPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    severityFilter,
    setSeverityFilter,
    appFilter,
    setAppFilter,
    durationFilter,
    setDurationFilter,
    uniqueApps,
    itemsPerPage
  } = useActivityFilters(activityLogs, activeTab, dateRange);

  return (
    <div className="space-y-4">
      <SearchAndFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        appFilter={appFilter}
        setAppFilter={setAppFilter}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        uniqueApps={uniqueApps}
      />

      <ActivityTable logs={paginatedLogs} />

      <ActivityPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        totalItems={filteredLogs.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
