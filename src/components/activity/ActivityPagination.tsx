
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ActivityPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function ActivityPagination({
  page,
  totalPages,
  setPage,
  totalItems,
  itemsPerPage
}: ActivityPaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setPage(Math.max(1, page - 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show pages around the current page
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (page <= 3) {
              pageNumber = i + 1;
            } else if (page >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = page - 2 + i;
            }
            
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={pageNumber === page}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <div className="text-sm text-gray-500">
        Showing {totalItems > 0 ? (page - 1) * itemsPerPage + 1 : 0} to {Math.min(page * itemsPerPage, totalItems)} of {totalItems} activities
      </div>
    </>
  );
}
