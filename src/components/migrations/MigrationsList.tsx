
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  FileDown, 
  FileUp, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Search,
  FilterX,
  Filter
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MigrationDetail } from './MigrationDetail';
import { useToast } from '@/components/ui/use-toast';
import { Migration } from '@/lib/api/migration/migrationService';
import { useMigrations } from '@/hooks/useMigrations';

// Sample migration data - in a real app this would come from an API/service
const sampleMigrations = [
  { 
    id: 'mig-001',
    name: 'Device Data Migration v1',
    status: 'completed',
    type: 'device',
    createdAt: new Date(2023, 4, 15).toISOString(),
    completedAt: new Date(2023, 4, 16).toISOString(),
    recordCount: 352,
    source: 'production',
    destination: 'backup',
    includeAttachments: true,
    includeHistoricalData: false,
    createdBy: 'admin@example.com',
    logs: [
      {
        id: 'log-001',
        migrationId: 'mig-001',
        timestamp: new Date(2023, 4, 15, 14, 30).toISOString(),
        level: 'info',
        message: 'Migration started',
      },
      {
        id: 'log-002',
        migrationId: 'mig-001',
        timestamp: new Date(2023, 4, 15, 14, 45).toISOString(),
        level: 'info',
        message: 'Processed 200 records',
      },
      {
        id: 'log-003',
        migrationId: 'mig-001',
        timestamp: new Date(2023, 4, 16, 8, 15).toISOString(),
        level: 'info',
        message: 'Migration completed successfully',
      }
    ]
  },
  { 
    id: 'mig-002',
    name: 'User Profiles Migration',
    status: 'pending',
    type: 'user',
    createdAt: new Date(2023, 5, 10).toISOString(),
    completedAt: null,
    recordCount: 128,
    source: 'staging',
    destination: 'production',
    includeAttachments: true,
    includeHistoricalData: true,
    createdBy: 'admin@example.com',
    logs: []
  },
  { 
    id: 'mig-003',
    name: 'MDM Settings Migration',
    status: 'in-progress',
    type: 'settings',
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    completedAt: null,
    recordCount: 45,
    source: 'development',
    destination: 'staging',
    includeAttachments: false,
    includeHistoricalData: false,
    createdBy: 'admin@example.com',
    logs: [
      {
        id: 'log-004',
        migrationId: 'mig-003',
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Migration started',
      }
    ]
  },
  { 
    id: 'mig-004',
    name: 'Policy Migration v2',
    status: 'failed',
    type: 'policy',
    createdAt: new Date(2023, 6, 1).toISOString(),
    startedAt: new Date(2023, 6, 1).toISOString(),
    completedAt: new Date(2023, 6, 1).toISOString(),
    recordCount: 17,
    source: 'production',
    destination: 'staging',
    includeAttachments: false,
    includeHistoricalData: true,
    createdBy: 'admin@example.com',
    logs: [
      {
        id: 'log-005',
        migrationId: 'mig-004',
        timestamp: new Date(2023, 6, 1).toISOString(),
        level: 'info',
        message: 'Migration started',
      },
      {
        id: 'log-006',
        migrationId: 'mig-004',
        timestamp: new Date(2023, 6, 1).toISOString(),
        level: 'error',
        message: 'Error: Connection timeout when migrating policies',
      }
    ]
  },
];

export const MigrationsList = () => {
  // In a real application, we would use the useMigrations hook
  // const { migrations, isLoading, error, executeMigration, deleteMigration } = useMigrations();
  const [migrations, setMigrations] = useState<Migration[]>(sampleMigrations as unknown as Migration[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedMigration, setSelectedMigration] = useState<Migration | null>(null);
  const { toast } = useToast();
  
  const handleViewDetails = (migration: Migration) => {
    setSelectedMigration(migration);
  };
  
  const handleExecuteMigration = (id: string) => {
    toast({
      title: "Migration Started",
      description: "The migration process has been initiated.",
    });
    
    // Update status in the UI
    setMigrations(prev => 
      prev.map(m => m.id === id ? {...m, status: 'in-progress'} : m)
    );
  };
  
  const handleDeleteMigration = (id: string) => {
    toast({
      title: "Migration Deleted",
      description: "The migration has been removed from the system.",
    });
    
    // Remove from the list
    setMigrations(prev => prev.filter(m => m.id !== id));
  };
  
  const handleExportMigration = (id: string) => {
    toast({
      title: "Export Started",
      description: "The migration details are being exported.",
    });
  };
  
  const handleBackToList = () => {
    setSelectedMigration(null);
  };
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Refreshing migration status...",
    });
    // In a real app, this would refetch migrations
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter(null);
    setTypeFilter(null);
  };
  
  const filteredMigrations = migrations.filter(migration => {
    let matchesSearch = true;
    let matchesStatus = true;
    let matchesType = true;
    
    if (searchTerm) {
      matchesSearch = migration.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    if (statusFilter) {
      matchesStatus = migration.status === statusFilter;
    }
    
    if (typeFilter) {
      matchesType = migration.type === typeFilter;
    }
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  if (selectedMigration) {
    return (
      <MigrationDetail 
        migration={selectedMigration}
        onBack={handleBackToList}
        onExecute={() => handleExecuteMigration(selectedMigration.id)}
        onRefresh={() => handleRefresh()}
        onExport={() => handleExportMigration(selectedMigration.id)}
      />
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>Migration History</CardTitle>
            <CardDescription>View and manage all migration tasks</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="mt-2 sm:mt-0" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search migrations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('in-progress')}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('failed')}>Failed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTypeFilter(null)}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('device')}>Device</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('user')}>User</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('policy')}>Policy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('settings')}>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {(searchTerm || statusFilter || typeFilter) && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                <FilterX className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Records</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMigrations.length > 0 ? (
              filteredMigrations.map((migration) => (
                <TableRow key={migration.id}>
                  <TableCell className="font-medium">{migration.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {migration.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        migration.status === 'completed' ? 'success' : 
                        migration.status === 'failed' ? 'destructive' : 
                        migration.status === 'in-progress' ? 'default' : 
                        'secondary'
                      }
                      className="capitalize"
                    >
                      {migration.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDistanceToNow(new Date(migration.createdAt), { addSuffix: true })}</TableCell>
                  <TableCell>{migration.recordCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        title="View Details"
                        onClick={() => handleViewDetails(migration)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {migration.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          title="Execute Migration"
                          onClick={() => handleExecuteMigration(migration.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        title="Export"
                        onClick={() => handleExportMigration(migration.id)}
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                      {(migration.status === 'completed' || migration.status === 'failed') && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          title="Delete"
                          onClick={() => handleDeleteMigration(migration.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No migrations found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
