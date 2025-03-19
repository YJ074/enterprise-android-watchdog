
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageOpen } from "lucide-react";

interface TopApplicationsCardProps {
  topApps: [string, number][];
}

export function TopApplicationsCard({ topApps }: TopApplicationsCardProps) {
  return (
    <Card className="shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          <PackageOpen className="h-5 w-5 mr-2 text-blue-500" />
          Most Installed Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          {topApps.map(([appName, count]) => (
            <div key={appName} className="flex justify-between items-center border-b pb-2">
              <span>{appName}</span>
              <Badge variant="outline" className="bg-blue-50">{count} devices</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
