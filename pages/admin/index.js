import Link from "next/link";
import Layout from "../../components/Layouts";
import Admin from "../../components/auth/Admin";

const adminIndex = () => {
  return (
    <Layout>
      <Admin>
        <h2>Admin Dashboard</h2>
      </Admin>
    </Layout>
  );
};

export default adminIndex;
