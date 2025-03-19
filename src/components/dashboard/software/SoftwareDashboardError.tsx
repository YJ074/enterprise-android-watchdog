
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface SoftwareDashboardErrorProps {
  onRefresh: () => void;
}

export function SoftwareDashboardError({ onRefresh }: SoftwareDashboardErrorProps) {
  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md border-2 border-red-200">
      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-600 font-medium text-lg mb-4">No software data available</p>
      <p className="text-gray-600 mb-6">
        There was an issue loading the software inventory data. Please try refreshing.
      </p>
      <Button onClick={onRefresh} variant="outline" size="md" className="mx-auto border-red-300 hover:bg-red-50">
        <RefreshCw className="mr-2 h-4 w-4 text-red-500" />
        Refresh Dashboard
      </Button>
    </div>
  );
}
