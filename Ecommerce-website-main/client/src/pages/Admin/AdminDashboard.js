import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout"; // Corrected import path
import './AdminDashboard.css'; // Ensure this file exists

const AdminDashboard = () => {
  const [auth] = useAuth(); // Get authenticated user info
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row justify-content-center mt-5">
          <div className="carddb w-75 p-3 mb-4">
            <h1 className="text-center form-title">Admin Panel</h1>
            <div className="admin-info text-center">
              <p>Admin Name: {auth?.user?.name} | Admin Email: {auth?.user?.email} | Admin Contact: {auth?.user?.phone}</p>
            </div>
            <div className="form-options">
              <div className="form-option" onClick={() => navigate("/dashboard/admin/create-category")}>
                Create Category
              </div>
              <div className="form-option" onClick={() => navigate("/dashboard/admin/create-product")}>
                Create Product
              </div>
              <div className="form-option" onClick={() => navigate("/dashboard/admin/products")}>
                Products
              </div>
              <div className="form-option" onClick={() => navigate("/dashboard/admin/orders")}>
                Orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
