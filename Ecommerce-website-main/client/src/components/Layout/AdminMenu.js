import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import './AdminMenu.css'; // Make sure to create this CSS file
import { Layout } from "antd";

const AdminMenu = () => {
  const [auth] = useAuth(); // Get authenticated user info
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <Layout>
    <div className="container-fluid m-3 p-3 mt-5">
      <div className="row justify-content-center mt-5">
        <div className="carddb w-75 p-3 mb-4">
          <h1 className="mt-5 text-center form-title">Admin Panel</h1>
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

export default AdminMenu;
