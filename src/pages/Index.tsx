
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { format } from "date-fns";

const Index = () => {
  // Mock last update time - in a real app, this would come from your API or data service
  const lastUpdateTime = new Date();

  return (
    <MainLayout>
      <div className="mb-4 text-xs text-gray-500 flex justify-end">
        Last data update: {format(lastUpdateTime, "PPpp")}
      </div>
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
