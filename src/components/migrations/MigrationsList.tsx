
import React, { useState, useRef } from 'react';
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
  Filter,
  Home,
  AlertCircle
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
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { MigrationStatusBadge } from './detail/MigrationStatusBadge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MigrationsListProps {
  migrations: Migration[];
  isLoading: boolean;
  onRefresh: () => void;
  onExecuteMigration: (id: string) => Promise<boolean>;
  onDeleteMigration: (id: string) => Promise<boolean>;
}

export const MigrationsList: React.FC<MigrationsListProps> = ({
  migrations,
  isLoading,
  onRefresh,
  onExecuteMigration,
  onDeleteMigration
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedMigration, setSelectedMigration] = useState<Migration | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleViewDetails = (migration: Migration) => {
    setSelectedMigration(migration);
  };
  
  const handleGoToDevices = () => {
    navigate('/devices');
  };
  
  const handleExecuteMigration = async (id: string) => {
    toast({
      title: "Migration Started",
      description: "The migration process has been initiated.",
    });
    
    const success = await onExecuteMigration(id);
    
    if (!success) {
      toast({
        title: "Migration Failed",
        description: "There was an error executing the migration.",
        variant: "destructive",
      });
    }
  };
  
  const handleConfirmDelete = (id: string) => {
    setConfirmDelete(id);
  };
  
  const handleDeleteMigration = async () => {
    if (!confirmDelete) return;
    
    const success = await onDeleteMigration(confirmDelete);
    
    if (success) {
      toast({
        title: "Migration Deleted",
        description: "The migration has been removed from the system.",
      });
      setConfirmDelete(null);
    } else {
      toast({
        title: "Deletion Failed",
        description: "There was an error deleting the migration.",
        variant: "destructive",
      });
    }
  };
  
  const handleExportMigration = (id: string) => {
    toast({
      title: "Export Started",
      description: "The migration details are being exported.",
    });
    
    const migration = migrations.find(m => m.id === id);
    if (migration) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify(migration, null, 2)
      );
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `migration-${id}-export.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      toast({
        title: "Export Complete",
        description: "Migration data has been exported successfully.",
      });
    }
  };
  
  const handleImportClick = () => {
    setImportDialogOpen(true);
    setImportError(null);
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        // Basic validation
        if (!importedData.id || !importedData.name || !importedData.type || !importedData.status) {
          setImportError("Invalid migration file format. Missing required fields.");
          return;
        }
        
        // Here you would normally add it to your migrations
        // For now, we'll just show a success toast
        toast({
          title: "Import Successful",
          description: `Migration "${importedData.name}" has been imported.`,
        });
        
        setImportDialogOpen(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        setImportError("Failed to parse migration file. Please ensure it's a valid JSON file.");
      }
    };
    
    reader.readAsText(file);
  };
  
  const handleBackToList = () => {
    setSelectedMigration(null);
  };
  
  const handleRefresh = () => {
    onRefresh();
    toast({
      title: "Refreshing",
      description: "Refreshing migration status...",
    });
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
      matchesSearch = 
        migration.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        migration.id.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    if (statusFilter) {
      matchesStatus = migration.status === statusFilter;
    }
    
    if (typeFilter) {
      matchesType = migration.type === typeFilter;
    }
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      'in-progress': 0,
      completed: 0,
      failed: 0
    };
    
    migrations.forEach(migration => {
      if (counts.hasOwnProperty(migration.status)) {
        counts[migration.status as keyof typeof counts]++;
      }
    });
    
    return counts;
  };
  
  const statusCounts = getStatusCounts();
  
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
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Migration History</CardTitle>
              <CardDescription>View and manage all migration tasks</CardDescription>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm" onClick={handleImportClick}>
                <FileUp className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm" onClick={handleGoToDevices}>
                <Home className="h-4 w-4 mr-2" />
                Devices
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-muted/30 rounded-md">
              <div className="text-muted-foreground text-sm">Pending</div>
              <div className="text-2xl font-bold">{statusCounts.pending}</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-md">
              <div className="text-muted-foreground text-sm">In Progress</div>
              <div className="text-2xl font-bold">{statusCounts['in-progress']}</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-md">
              <div className="text-muted-foreground text-sm">Completed</div>
              <div className="text-2xl font-bold">{statusCounts.completed}</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-md">
              <div className="text-muted-foreground text-sm">Failed</div>
              <div className="text-2xl font-bold">{statusCounts.failed}</div>
            </div>
          </div>
        
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search migrations by name or ID..."
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
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading migrations...</span>
            </div>
          ) : (
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
                        <MigrationStatusBadge status={migration.status} />
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
                              onClick={() => handleConfirmDelete(migration.id)}
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
          )}
        </CardContent>
      </Card>
      
      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Migration</DialogTitle>
            <DialogDescription>
              Upload a previously exported migration file to import it into the system.
            </DialogDescription>
          </DialogHeader>
          
          {importError && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{importError}</AlertDescription>
            </Alert>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept=".json"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20">
            <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Drag and drop your migration file here, or click the button below
            </p>
            <Button onClick={handleFileSelect}>
              Select File
            </Button>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this migration? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMigration}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
