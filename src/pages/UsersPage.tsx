
import { MainLayout } from "@/components/layout/MainLayout";
import { UserList } from "@/components/users/UserList";
import { Helmet } from "react-helmet";

const UsersPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Users | Enterprise Dashboard</title>
      </Helmet>
      <UserList />
    </MainLayout>
  );
};

export default UsersPage;
