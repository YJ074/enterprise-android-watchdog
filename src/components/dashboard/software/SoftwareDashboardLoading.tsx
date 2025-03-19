
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function SoftwareDashboardLoading() {
  return (
    <div className="p-8 space-y-6 bg-white rounded-lg shadow-md border-2 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="w-64">
          <Skeleton className="h-10 w-full bg-blue-100" />
        </div>
        <Skeleton className="h-10 w-28 bg-blue-100" />
      </div>
      
      <Skeleton className="h-16 w-full bg-blue-100" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full bg-blue-100" />
        <Skeleton className="h-64 w-full bg-blue-100" />
      </div>
      
      <Skeleton className="h-72 w-full bg-blue-100" />
      
      <div className="flex items-center justify-center py-6 bg-blue-50 rounded-lg border border-blue-200">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        <span className="ml-3 text-blue-700 font-medium text-lg">Loading software data...</span>
      </div>
    </div>
  );
}
