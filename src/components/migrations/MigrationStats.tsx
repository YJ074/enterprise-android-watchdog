
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Migration } from '@/lib/api/migration/migrationService';
import { Loader2 } from 'lucide-react';

interface MigrationStatsProps {
  migrations: Migration[];
  isLoading: boolean;
}

export const MigrationStats: React.FC<MigrationStatsProps> = ({ migrations, isLoading }) => {
  // Calculate stats
  const pendingCount = migrations.filter(m => m.status === 'pending').length;
  const inProgressCount = migrations.filter(m => m.status === 'in-progress').length;
  const completedCount = migrations.filter(m => m.status === 'completed').length;
  const failedCount = migrations.filter(m => m.status === 'failed').length;
  const totalCount = migrations.length;
  
  // Calculate success rate
  const successRate = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;
  
  const statItems = [
    { label: 'Total Migrations', value: totalCount.toString(), color: 'bg-gray-100 dark:bg-gray-800' },
    { label: 'Pending', value: pendingCount.toString(), color: 'bg-yellow-100 dark:bg-yellow-900' },
    { label: 'In Progress', value: inProgressCount.toString(), color: 'bg-blue-100 dark:bg-blue-900' },
    { label: 'Completed', value: completedCount.toString(), color: 'bg-green-100 dark:bg-green-900' },
    { label: 'Failed', value: failedCount.toString(), color: 'bg-red-100 dark:bg-red-900' },
    { label: 'Success Rate', value: `${successRate}%`, color: 'bg-purple-100 dark:bg-purple-900' },
  ];
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6 flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Loading statistics...</span>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((item, index) => (
            <div 
              key={index} 
              className={`${item.color} rounded-lg p-4 text-center transition-all hover:shadow-md`}
            >
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
