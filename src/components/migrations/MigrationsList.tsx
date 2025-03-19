
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, FileDown, FileUp, Trash2, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Sample migration data - in a real app this would come from an API/service
const migrations = [
  { 
    id: 'mig-001',
    name: 'Device Data Migration v1',
    status: 'completed',
    type: 'device',
    createdAt: new Date(2023, 4, 15),
    completedAt: new Date(2023, 4, 16),
    count: 352
  },
  { 
    id: 'mig-002',
    name: 'User Profiles Migration',
    status: 'pending',
    type: 'user',
    createdAt: new Date(2023, 5, 10),
    completedAt: null,
    count: 128
  },
  { 
    id: 'mig-003',
    name: 'MDM Settings Migration',
    status: 'in-progress',
    type: 'settings',
    createdAt: new Date(),
    completedAt: null,
    count: 45
  },
  { 
    id: 'mig-004',
    name: 'Policy Migration v2',
    status: 'failed',
    type: 'policy',
    createdAt: new Date(2023, 6, 1),
    completedAt: new Date(2023, 6, 1),
    count: 17
  },
];

export const MigrationsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Migration History</CardTitle>
      </CardHeader>
      <CardContent>
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
            {migrations.map((migration) => (
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
                <TableCell>{formatDistanceToNow(migration.createdAt, { addSuffix: true })}</TableCell>
                <TableCell>{migration.count}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {migration.status === 'pending' && (
                      <Button variant="outline" size="icon" title="Execute Migration">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" title="Export">
                      <FileDown className="h-4 w-4" />
                    </Button>
                    {(migration.status === 'completed' || migration.status === 'failed') && (
                      <Button variant="outline" size="icon" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
