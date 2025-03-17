
import { MainLayout } from "@/components/layout/MainLayout";
import { Settings } from "@/components/settings/Settings";
import { Helmet } from "react-helmet-async";

const SettingsPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Settings | Enterprise Dashboard</title>
      </Helmet>
      <Settings />
    </MainLayout>
  );
};

export default SettingsPage;
