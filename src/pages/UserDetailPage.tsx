
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserDetail } from "@/components/users/UserDetail";
import { Helmet } from "react-helmet";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <MainLayout>
      <Helmet>
        <title>User Details | Enterprise Dashboard</title>
      </Helmet>
      <UserDetail userId={id!} />
    </MainLayout>
  );
};

export default UserDetailPage;
