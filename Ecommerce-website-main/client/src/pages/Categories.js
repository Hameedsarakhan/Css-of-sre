import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  return (
    <Layout title="Our Menu">
      <div className="mt-5">
        <h1>Categories</h1>
      </div>

      <div className="container">
        
        <div className="row">
          <div className="col-md-3 menudiv">
            <img className="icons" src="/images/pasta.jpg" />
            <h4 className="mt-10">Exquisite Pasta Creations</h4>
            <p>
              Indulge in the timeless flavors of Italy with our handcrafted pasta
            </p>
            <Link to="/category/pasta" className="rdmore2">
              Explore More
            </Link>
          </div>

          <div className="col-md-3 menudiv">
            <img className="icons" src="/images/sandwiches.jpg" />
            <h4>Sandwiches</h4>
            <p>
              Experience the flavour of our perfect sandwiches.
            </p>
            <Link to="/category/sandwiches" className="rdmore2">
              Explore More
            </Link>
          </div>

          <div className="col-md-3 menudiv">
            <img className="icons" src="/images/chowmein.jfif" />
            <h4>Irresistible Chowmein</h4>
            <p>
              Delight your senses with our savory chowmein.
            </p>
            <Link to="/category/chowmein" className="rdmore2">
              Explore More
            </Link>
          </div>
          <div className="col-md-3 menudiv">
            <img className="icons" src="/images/soups.jpg" />
            <h4>Soups</h4>
            <p>
              Explore our diverse selection of soups.</p>
            <Link to="/category/soups" className="rdmore2">
              Explore More
            </Link>
          </div>
        </div>


        <div className="row">
          <div className="col-md-3 menudiv">
            <img className="icons" src="/images/desserts.jfif" />
            <h4>Desserts</h4>
            <p>
              Explore our delectable assortment of desserts.
            </p>
            <Link to="/category/desserts" className="rdmore2">
              Explore More
            </Link>
          </div>

          <div className="col-md-3 menudiv">
            <img className="icons" src="/images/beverages.jfif" />
            <h4>Refreshing Beverages</h4>
            <p>
              Quench your thirst with our refreshing selection of beverages.
            </p>
            <Link to="/category/drinks" className="rdmore2">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
