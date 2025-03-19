
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
    <div className="flex justify-between items-center">
      <SoftwareHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Button onClick={onRefresh} variant="outline" size="sm">
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
}
