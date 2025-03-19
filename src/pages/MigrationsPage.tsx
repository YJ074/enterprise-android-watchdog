
import { MainLayout } from "@/components/layout/MainLayout";
import { MigrationDashboard } from "@/components/migrations/MigrationDashboard";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const MigrationsPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    // This simulates an initial load notification for admins
    toast({
      title: "Migration System",
      description: "The migration dashboard is now available for all system components.",
    });
  }, [toast]);

  return (
    <MainLayout>
      <MigrationDashboard />
    </MainLayout>
  );
};

export default MigrationsPage;
