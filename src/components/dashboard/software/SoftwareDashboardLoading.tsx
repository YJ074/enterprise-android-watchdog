
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function SoftwareDashboardLoading() {
  return (
    <div className="p-8 space-y-6 bg-white rounded-lg shadow-md border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="w-64">
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
      
      <Skeleton className="h-16 w-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
      
      <Skeleton className="h-72 w-full" />
      
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-blue-500 font-medium">Loading software data...</span>
      </div>
    </div>
  );
}
