
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface SoftwareDashboardErrorProps {
  onRefresh: () => void;
}

export function SoftwareDashboardError({ onRefresh }: SoftwareDashboardErrorProps) {
  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md border border-red-100">
      <p className="text-red-500 font-medium mb-4">No software data available</p>
      <p className="text-muted-foreground mb-4">
        There was an issue loading the software inventory data. Please try refreshing.
      </p>
      <Button onClick={onRefresh} variant="outline" size="sm" className="mx-auto">
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh Dashboard
      </Button>
    </div>
  );
}
