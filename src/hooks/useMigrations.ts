
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { migrationService, Migration, MigrationStatus } from '@/lib/api/migration/migrationService';
import { useApi } from '@/hooks/useApi';

export function useMigrations() {
  const [migrations, setMigrations] = useState<Migration[]>([]);
  const [selectedMigration, setSelectedMigration] = useState<Migration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  const api = useApi<Migration[]>();
  
  const fetchMigrations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await migrationService.getMigrations();
      if (response.error) {
        setError(response.error);
        toast({
          title: "Error fetching migrations",
          description: response.error,
          variant: "destructive",
        });
      } else {
        setMigrations(response.data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  const executeMigration = useCallback(async (id: string) => {
    try {
      const response = await migrationService.executeMigration(id);
      
      if (response.error) {
        toast({
          title: "Error executing migration",
          description: response.error,
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Migration executed",
          description: "The migration has been successfully started.",
        });
        // Update the migration in the list
        setMigrations(prev => 
          prev.map(m => m.id === id ? {...m, status: 'in-progress' as MigrationStatus} : m)
        );
        return true;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);
  
  const deleteMigration = useCallback(async (id: string) => {
    try {
      const response = await migrationService.deleteMigration(id);
      
      if (response.error) {
        toast({
          title: "Error deleting migration",
          description: response.error,
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Migration deleted",
          description: "The migration has been successfully deleted.",
        });
        // Remove from the list
        setMigrations(prev => prev.filter(m => m.id !== id));
        return true;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);
  
  const createMigration = useCallback(async (data: any) => {
    try {
      const response = await migrationService.createMigration(data);
      
      if (response.error) {
        toast({
          title: "Error creating migration",
          description: response.error,
          variant: "destructive",
        });
        return null;
      } else {
        toast({
          title: "Migration created",
          description: "The migration has been successfully created.",
        });
        // Add to the list
        if (response.data) {
          setMigrations(prev => [...prev, response.data]);
        }
        return response.data;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);
  
  // Load migrations when the component mounts
  useEffect(() => {
    fetchMigrations();
  }, [fetchMigrations]);
  
  return {
    migrations,
    selectedMigration,
    setSelectedMigration,
    isLoading,
    error,
    fetchMigrations,
    executeMigration,
    deleteMigration,
    createMigration,
  };
}
