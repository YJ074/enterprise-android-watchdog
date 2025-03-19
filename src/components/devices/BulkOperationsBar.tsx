
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Device } from "@/lib/types/device.types";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  PowerOff, 
  RefreshCw, 
  Trash2, 
  Lock, 
  Bell, 
  BellOff,
  Download,
  Tag,
  ChevronDown
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface BulkOperationsBarProps {
  selectedDevices: Device[];
  clearSelection: () => void;
  onUpdateDevices: (deviceIds: string[], updates: Partial<Device>) => void;
  onDeleteDevices: (deviceIds: string[]) => void;
  onExportDevices: (devices: Device[]) => void;
}

export function BulkOperationsBar({
  selectedDevices,
  clearSelection,
  onUpdateDevices,
  onDeleteDevices,
  onExportDevices
}: BulkOperationsBarProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const deviceIds = selectedDevices.map(device => device.id);
  const allOnline = selectedDevices.every(device => device.status === 'online');
  const allOffline = selectedDevices.every(device => device.status === 'offline');
  
  const handleBulkMarkOffline = () => {
    onUpdateDevices(deviceIds, { status: 'offline' });
    clearSelection();
  };
  
  const handleBulkMarkOnline = () => {
    onUpdateDevices(deviceIds, { status: 'online' });
    clearSelection();
  };
  
  const handleBulkDelete = () => {
    setShowDeleteDialog(true);
  };
  
  const confirmBulkDelete = () => {
    onDeleteDevices(deviceIds);
    setShowDeleteDialog(false);
    clearSelection();
  };
  
  const handleExportSelected = () => {
    onExportDevices(selectedDevices);
  };
  
  if (selectedDevices.length === 0) {
    return null;
  }
  
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-muted/40 border rounded-md mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">{selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''} selected</span>
          <Button variant="ghost" size="sm" onClick={clearSelection}>
            Clear selection
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportSelected}
            className="gap-1"
          >
            <Download className="h-4 w-4" />
            Export Selected
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Tag className="h-4 w-4" />
                Set Department
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Assign Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { department: 'Engineering' });
                clearSelection();
              }}>
                Engineering
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { department: 'Sales' });
                clearSelection();
              }}>
                Sales
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { department: 'Marketing' });
                clearSelection();
              }}>
                Marketing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { department: 'Executive' });
                clearSelection();
              }}>
                Executive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { department: 'Support' });
                clearSelection();
              }}>
                Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Actions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Bulk Operations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!allOffline && (
                <DropdownMenuItem onClick={handleBulkMarkOffline}>
                  <PowerOff className="h-4 w-4 mr-2" />
                  Mark as Offline
                </DropdownMenuItem>
              )}
              {!allOnline && (
                <DropdownMenuItem onClick={handleBulkMarkOnline}>
                  <PowerOff className="h-4 w-4 mr-2" />
                  Mark as Online
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { status: 'warning' });
                clearSelection();
              }}>
                <Bell className="h-4 w-4 mr-2" />
                Flag for Attention
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                onUpdateDevices(deviceIds, { status: 'compromised' });
                clearSelection();
              }}>
                <Lock className="h-4 w-4 mr-2" />
                Mark as Compromised
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Devices
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Confirmation dialog for bulk delete */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Devices</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
