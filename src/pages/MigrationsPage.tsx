
import { MainLayout } from "@/components/layout/MainLayout";
import { MigrationDashboard } from "@/components/migrations/MigrationDashboard";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const MigrationsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // This simulates an initial load notification for admins
    toast({
      title: "Migration System",
      description: "The migration dashboard is now available for all system components.",
    });
  }, [toast]);

  const handleGoToDevices = () => {
    navigate('/devices');
  };

  return (
    <MainLayout>
      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleGoToDevices}>
          <Home className="h-4 w-4 mr-2" />
          Back to Devices
        </Button>
      </div>
      <MigrationDashboard />
    </MainLayout>
  );
};

export default MigrationsPage;
