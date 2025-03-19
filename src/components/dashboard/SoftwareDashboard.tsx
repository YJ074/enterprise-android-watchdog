
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { devices } from "@/lib/mock-data";
import { Search, PackageOpen, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function SoftwareDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Extract all applications from all devices
  const allApplications = devices.flatMap(device => 
    device.applications.map(app => ({
      ...app,
      deviceName: device.name,
      deviceModel: device.model,
      deviceOS: device.osVersion
    }))
  );
  
  // Filter applications based on search term
  const filteredApplications = allApplications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count applications by name
  const appCounts = allApplications.reduce((acc, app) => {
    acc[app.name] = (acc[app.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get top 10 applications by installation count
  const topApps = Object.entries(appCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Effect to show a loading toast to guide user attention
  useEffect(() => {
    toast({
      title: "Software Dashboard Loaded",
      description: "Viewing software installed across all devices in your organization.",
    });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
      
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
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.slice(0, 8).map((app) => (
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
              onClick={() => {
                toast({
                  title: "Software Report Generated",
                  description: "A detailed software report has been prepared for your review.",
                });
              }}
            >
              Generate Software Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Add a warning for non-compliant software */}
      <Alert className="bg-amber-50 border-amber-200 shadow-md">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Software Compliance Notice</AlertTitle>
        <AlertDescription className="text-amber-700">
          Some devices may be running outdated or non-compliant software. Review the inventory to ensure all devices meet your organization's requirements.
        </AlertDescription>
      </Alert>
    </div>
  );
}
