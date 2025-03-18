
import { activityLogs } from "@/lib/mock-data";
import { useActivityFilters } from "./useActivityFilters";
import { useActivityListState } from "./useActivityListState";
import { SearchAndFilterBar } from "./filters/SearchAndFilterBar";
import { ActivityTable } from "./ActivityTable";
import { ActivityPagination } from "./ActivityPagination";
import { useMemo } from "react";

interface ActivityListProps {
  activeTab?: string;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function ActivityList({ activeTab = "all", dateRange }: ActivityListProps) {
  const {
    filteredLogs,
    page,
    setPage,
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

  // Use memoized state to prevent unnecessary re-renders
  const { paginatedLogs, totalPages } = useMemo(
    () => useActivityListState({ filteredLogs, page, itemsPerPage }),
    [filteredLogs, page, itemsPerPage]
  );

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
