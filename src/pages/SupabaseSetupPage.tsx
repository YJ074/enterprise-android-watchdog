
import { MainLayout } from "@/components/layout/MainLayout";
import { SupabaseSetupInstructions } from "@/components/setup/SupabaseSetupInstructions";

const SupabaseSetupPage = () => {
  return (
    <MainLayout>
      <SupabaseSetupInstructions />
    </MainLayout>
  );
};

export default SupabaseSetupPage;
