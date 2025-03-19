
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Server, Database, Users, Settings, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export const MigrationStats = () => {
  // In a real application, these would be fetched from an API
  const stats = {
    totalMigrations: 24,
    pendingMigrations: 3,
    completedMigrations: 18,
    failedMigrations: 3,
    deviceMigrations: 8,
    userMigrations: 7,
    policyMigrations: 5,
    settingsMigrations: 4,
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{stats.pendingMigrations}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{stats.completedMigrations}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-md">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold">{stats.failedMigrations}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md">
              <Database className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{stats.totalMigrations}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <Server className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Device</p>
              <p className="text-xl font-semibold">{stats.deviceMigrations}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User</p>
              <p className="text-xl font-semibold">{stats.userMigrations}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <Database className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Policy</p>
              <p className="text-xl font-semibold">{stats.policyMigrations}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Settings</p>
              <p className="text-xl font-semibold">{stats.settingsMigrations}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
