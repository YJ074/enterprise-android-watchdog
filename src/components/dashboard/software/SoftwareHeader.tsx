
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PackageOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SoftwareHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SoftwareHeader({ searchTerm, setSearchTerm }: SoftwareHeaderProps) {
  return (
    <>
      <Alert className="bg-blue-50 border-blue-200 mb-6 shadow-md">
        <PackageOpen className="h-4 w-4" />
        <AlertTitle className="text-blue-800">Software Inventory</AlertTitle>
        <AlertDescription className="text-blue-700">
          View and manage software installed across all devices in your organization.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <PackageOpen className="h-5 w-5 mr-2 text-blue-500" />
          Software Management
        </h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
