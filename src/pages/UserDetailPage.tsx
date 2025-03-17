
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserDetail } from "@/components/users/UserDetail";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <MainLayout>
      <UserDetail userId={id!} />
    </MainLayout>
  );
};

export default UserDetailPage;
