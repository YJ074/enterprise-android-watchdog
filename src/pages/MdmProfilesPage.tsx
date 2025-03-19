
import { MainLayout } from "@/components/layout/MainLayout";
import { ProfilesList } from "@/components/devices/mdm/ProfilesList";

const MdmProfilesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">MDM Configuration Profiles</h1>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <ProfilesList />
        </div>
      </div>
    </MainLayout>
  );
};

export default MdmProfilesPage;
