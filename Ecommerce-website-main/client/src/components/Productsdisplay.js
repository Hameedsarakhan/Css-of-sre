import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductsDisplay = () => {
  const [products, setProducts] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`); // Fetch all products
      setProducts(data.products); // Set products directly
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-display">
      <h2 className="text-center">All Products</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {loading ? ( // Show loading message while products are being fetched
          <p className="text-center">Loading...</p>
        ) : products && products.length > 0 ? ( // Check if products is defined and has items
          products.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
            >
              <div className="card m-3" style={{ width: "250px", height: "400px" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text" style={{
                    height: "40px", overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
                  }}>
                    {p.description}
                  </p>
                  <button className="btn btn-danger container">Edit</button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No products available.</p> // Handle no products case
        )}
      </div>
    </div>
  );
};

export default ProductsDisplay;
