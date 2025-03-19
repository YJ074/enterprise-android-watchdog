
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MigrationsList } from './MigrationsList';
import { MigrationExecutor } from './MigrationExecutor';
import { MigrationCreator } from './MigrationCreator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InfoBanner } from "../common/InfoBanner";

export const MigrationDashboard = () => {
  const [activeTab, setActiveTab] = useState('migrations');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Migrations</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Migrations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <InfoBanner
        title="Migration System"
        message="The migration system allows you to manage data transitions across your MDM platform. Use it to migrate devices, users, or settings between environments."
      />

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="migrations">Migrations</TabsTrigger>
          <TabsTrigger value="execute">Execute Migration</TabsTrigger>
          <TabsTrigger value="create">Create Migration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="migrations" className="space-y-4">
          <MigrationsList />
        </TabsContent>
        
        <TabsContent value="execute" className="space-y-4">
          <MigrationExecutor />
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <MigrationCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
