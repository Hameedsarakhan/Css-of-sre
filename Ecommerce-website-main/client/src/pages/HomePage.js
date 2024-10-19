import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // State for feedback form
  const [feedbackType, setFeedbackType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const [auth] = useAuth();

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !email || !phone || !details) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone format (assuming a basic 11-digit number)
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number (11 digits)");
      return;
    }

    // Check if user is authenticated
    if (!auth.user) {
      toast.error("Please sign in to submit feedback");
      return;
    }

    try {
      const feedbackData = { type: feedbackType, name, email, phone, details };
      const response = await axios.post(
        "/api/v1/feedback/submit",
        feedbackData
      );
      console.log(response);

      if (response.status === 201) {
        toast.success(response.data.message);
        setFeedbackType("");
        setName("");
        setEmail("");
        setPhone("");
        setDetails("");
      } else {
        toast.error(response.data.error || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Layout title={"ALl Products - Best offers "}>


<div className="imgcentre">
        <img className=" img3" src="/images/mainpasta2.jpg" />
        <h1 className="container mt-5">
            Indulge in
            <span className="red"> Pasta on the Plate!</span>
          </h1>
          <p className="container text-centre mainp">
            Embark on a culinary journey like no other with our premier
            ecommerce pasta shop. Offering an enticing array of handcrafted
            pasta delicacies, we invite you to savor the authentic flavors of
            Italy from the comfort of your home. From traditional classics to
            innovative creations, each artisanal pasta is meticulously crafted
            using only the finest ingredients, promising a gastronomic
            experience that tantalizes the taste buds.{" "}
          </p>
          <button className="d-flex align-items-center mainbtn">
            <Link to="/categories" className="container btnlink">
              Order Now
            </Link>
          </button>
     
     
     
      </div>

  
        



      <div className="row mt-3 home-page">
        <div className="col-md-12 mt-5">
          <h1 style={{ color: "white" }} className="text-center">
            All Products
          </h1>
          <div className="d-flex flex-wrap testproducts">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="text-start card-title">{p.name}</h5>
                    <h5 className="text-start card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                    

                  </div>
                  <p className="card-text-light">
                    {p.description.substring(0, 40)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-danger ms-1 moredetails"
                      name="More Details"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-success ms-1 addtocart"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>









      <div className="mainflex">
        <div className="flex1">
          <img className="img2" src="/images/imgorder1.jpeg" />
        </div>
        <div className="flex2">
          <img className="img2" src="/images/imgorder2.jpeg" />
        </div>
      </div>

     
      <div className="flex_main2h2">
        <br />
        <br />
        <br />
        <h1>Want help ? Wanna Leave a review ?</h1>
        <p className="text-center">Tell us more about your queries or give us feedback..</p>
      </div>

      <div className="flexescontainer">
        <div className="left-div">
          <img src="/images/12.gif" alt="Your Image" />
        </div>

        <div className="right-div">
          <form onSubmit={handleSubmit}>
            <select
              id="dropdown"
              name="dropdown"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
            >
              <option value="" disabled defaultValue>
                I am interested in
              </option>
              <option value="Feedback">Feedback</option>
              <option value="Inquiring Details">Inquiring Details</option>
            </select>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              id="project"
              name="project"
              placeholder="Detail"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
            <br />
            <button className="submitbtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>

     
    </Layout>
  );
};

export default HomePage;
