
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { SoftwareHeader } from './SoftwareHeader';

interface SoftwareDashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onRefresh: () => void;
}

export function SoftwareDashboardHeader({ 
  searchTerm, 
  setSearchTerm, 
  onRefresh 
}: SoftwareDashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border-2 border-blue-100">
      <SoftwareHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Button onClick={onRefresh} variant="outline" size="sm" className="border-blue-300 hover:bg-blue-50">
        <RefreshCw className="mr-2 h-4 w-4 text-blue-600" />
        Refresh
      </Button>
    </div>
  );
}
