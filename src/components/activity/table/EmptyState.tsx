
import { TableRow, TableCell } from "@/components/ui/table";
import { Search } from "lucide-react";

interface EmptyStateProps {
  filterActive?: boolean;
}

export function EmptyState({ filterActive = false }: EmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={7} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          {filterActive ? (
            <>
              <Search className="h-8 w-8 mb-4 text-muted-foreground/60" />
              <p>No activities found matching your filters</p>
              <p className="text-sm mt-2">Try adjusting your search criteria</p>
            </>
          ) : (
            <>
              <div className="h-8 w-8 mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">!</span>
              </div>
              <p>No activities recorded yet</p>
              <p className="text-sm mt-2">Activities will appear here when users take actions</p>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
