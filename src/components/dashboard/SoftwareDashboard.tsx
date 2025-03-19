
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { devices } from "@/lib/mock-data";
import { Search } from "lucide-react";

export function SoftwareDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Software Inventory</h2>
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
        <Card>
          <CardHeader>
            <CardTitle>Most Installed Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topApps.map(([appName, count]) => (
                <div key={appName} className="flex justify-between items-center border-b pb-2">
                  <span>{appName}</span>
                  <Badge variant="outline">{count} devices</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Software Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Applications:</span>
                <Badge variant="secondary">{allApplications.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Unique Applications:</span>
                <Badge variant="secondary">{Object.keys(appCounts).length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>System Applications:</span>
                <Badge variant="secondary">
                  {allApplications.filter(app => app.isSystemApp).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>User Applications:</span>
                <Badge variant="secondary">
                  {allApplications.filter(app => !app.isSystemApp).length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Application Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
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
                  filteredApplications.map((app) => (
                    <TableRow key={`${app.id}-${app.deviceName}`}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>{app.version}</TableCell>
                      <TableCell>{app.size} MB</TableCell>
                      <TableCell>{app.deviceName}</TableCell>
                      <TableCell>{app.deviceOS}</TableCell>
                      <TableCell>
                        <Badge variant={app.isSystemApp ? "secondary" : "default"}>
                          {app.isSystemApp ? "System" : "User"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
