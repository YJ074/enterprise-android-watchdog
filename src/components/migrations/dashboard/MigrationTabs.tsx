
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MigrationsList } from '../MigrationsList';
import { MigrationExecutor } from '../MigrationExecutor';
import { MigrationCreator } from '../MigrationCreator';

interface MigrationTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const MigrationTabs: React.FC<MigrationTabsProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
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
  );
};
