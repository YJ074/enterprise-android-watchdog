
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, PackageOpen } from "lucide-react";

interface SoftwareHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SoftwareHeader({ searchTerm, setSearchTerm }: SoftwareHeaderProps) {
  console.log("Rendering SoftwareHeader");
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold flex items-center mb-4">
        <PackageOpen className="h-5 w-5 mr-2 text-blue-500" />
        Software Management
      </h2>
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
