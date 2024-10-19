import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import "../../styles/AdmnOrders.css";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Removed unnecessary setter function

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

  return (
    <Layout title="All Orders Data">
      <div className="container-fluid m-3 p-3 dashboard mt-5">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <h1 className="mt-5 text-center text-white">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="border shadow mb-4 p-3 " key={o._id}>
                <h4 className="text-center text-white mb-3 d-md-none">
                  Order #{i + 1}
                </h4>
                <div className="table-responsive">
                  <table className="table table-bordered table-sm text-white">
                    <thead className="bg-black text-white">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s) => (
                              <Option key={s} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-7">
                  {o?.products?.map((p) => (
                    <div
                      className="row mb-2 p-2 card flex-row text-black"
                      key={p._id}
                    >
                      <div className="text-black">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="350px"
                          height="auto"
                        />
                      </div>
                      <div className="col-md-8 text-black">
                        <h5>{p.name}</h5>
                    
                        <p>Price: {p.price} $</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
