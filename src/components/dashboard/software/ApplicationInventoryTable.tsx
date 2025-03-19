
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ApplicationWithDevice {
  id: string;
  name: string;
  version: string;
  size: number;
  isSystemApp: boolean;
  permissions: string[];
  installDate: string;
  deviceName: string;
  deviceModel: string;
  deviceOS: string;
}

interface ApplicationInventoryTableProps {
  applications: ApplicationWithDevice[];
}

export function ApplicationInventoryTable({ applications }: ApplicationInventoryTableProps) {
  const { toast } = useToast();
  
  const handleGenerateReport = () => {
    toast({
      title: "Software Report Generated",
      description: "A detailed software report has been prepared for your review.",
    });
  };
  
  return (
    <Card className="shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          <PackageOpen className="h-5 w-5 mr-2 text-blue-500" />
          Application Inventory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead>Application Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                applications.slice(0, 8).map((app) => (
                  <TableRow key={`${app.id}-${app.deviceName}`} className="hover:bg-blue-50 transition-colors">
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.version}</TableCell>
                    <TableCell>{app.size} MB</TableCell>
                    <TableCell>{app.deviceName}</TableCell>
                    <TableCell>{app.deviceOS}</TableCell>
                    <TableCell>
                      <Badge variant={app.isSystemApp ? "secondary" : "default"} className={app.isSystemApp ? "bg-gray-100" : "bg-blue-100 text-blue-800"}>
                        {app.isSystemApp ? "System" : "User"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button 
            size="sm" 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleGenerateReport}
          >
            Generate Software Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
