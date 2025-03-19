
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MigrationsList } from '../MigrationsList';
import { MigrationExecutor } from '../MigrationExecutor';
import { MigrationCreator } from '../MigrationCreator';
import { Migration } from '@/lib/api/migration/migrationService';

interface MigrationTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  migrations: Migration[];
  isLoading: boolean;
  onRefresh: () => void;
  onExecuteMigration: (id: string) => Promise<boolean>;
  onDeleteMigration: (id: string) => Promise<boolean>;
}

export const MigrationTabs: React.FC<MigrationTabsProps> = ({
  activeTab,
  setActiveTab,
  migrations,
  isLoading,
  onRefresh,
  onExecuteMigration,
  onDeleteMigration
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
        <MigrationsList
          migrations={migrations}
          isLoading={isLoading}
          onRefresh={onRefresh}
          onExecuteMigration={onExecuteMigration}
          onDeleteMigration={onDeleteMigration}
        />
      </TabsContent>

      <TabsContent value="execute" className="space-y-4">
        <MigrationExecutor
          migrations={migrations}
          onExecuteMigration={onExecuteMigration}
        />
      </TabsContent>

      <TabsContent value="create" className="space-y-4">
        <MigrationCreator />
      </TabsContent>
    </Tabs>
  );
};
