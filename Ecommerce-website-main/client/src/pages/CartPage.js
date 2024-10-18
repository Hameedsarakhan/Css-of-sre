import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    let total = 0;
    cart?.forEach(item => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter(item => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getToken = async () => {
    const { data } = await axios.get("/api/v1/product/braintree/token");
    setClientToken(data?.clientToken);
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post("/api/v1/product/braintree/payment", {
      nonce,
      cart,
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders");
    toast.success("Payment Completed Successfully");
  };

  return (
    <Layout>
      <div className="cart-page container">
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Total: {totalPrice()}</p>
          {auth?.user?.address ? (
            <div className="address-card mb-3">
              <p>Current Address: {auth?.user?.address}</p>
              <button
                className="btn btn-danger"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          ) : (
            <div className="mb-3 address-card">
              {auth?.token ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  Please Login to checkout
                </button>
              )}
            </div>
          )}
          <div className="mt-2">
            {!clientToken || !auth?.token || !cart?.length ? null : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <br/>
                <button
                  className="btn btn-danger"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing ...." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product List on the Right */}
        <div className="product-list">
          {cart?.map((p) => (
            <div className="card" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img"
                alt={p.name}
              />
              <div className="card-body">
                <p>{p.name}</p>
                <p>Price: {p.price} $</p>
                <button
                  className="btn btn-danger remove"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
