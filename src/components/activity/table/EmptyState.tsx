
import { TableRow, TableCell } from "@/components/ui/table";

export function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
        No activities found matching your filters
      </TableCell>
    </TableRow>
  );
}
