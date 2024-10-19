import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mt-5">
        <div className="row">
        <div className="admin-info text-center">
          <h1 className="mt-5">User Profile</h1>
              <p>User Name: {auth?.user?.name} | User Email: {auth?.user?.email} | User Contact: {auth?.user?.phone}</p>
           <UserMenu/>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;