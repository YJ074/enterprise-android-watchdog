
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageOpen } from "lucide-react";
import { Application } from '@/lib/types/device.types';

interface SoftwareStatisticsCardProps {
  allApplications: Application[];
  appCounts: Record<string, number>;
}

export function SoftwareStatisticsCard({ allApplications, appCounts }: SoftwareStatisticsCardProps) {
  return (
    <Card className="shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          <PackageOpen className="h-5 w-5 mr-2 text-blue-500" />
          Software Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Total Applications:</span>
            <Badge variant="secondary" className="bg-blue-50">{allApplications.length}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Unique Applications:</span>
            <Badge variant="secondary" className="bg-blue-50">{Object.keys(appCounts).length}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>System Applications:</span>
            <Badge variant="secondary" className="bg-blue-50">
              {allApplications.filter(app => app.isSystemApp).length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>User Applications:</span>
            <Badge variant="secondary" className="bg-blue-50">
              {allApplications.filter(app => !app.isSystemApp).length}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
