import React from "react";
import Layout from "./../../components/Layout/Layout";
import Productsdisplay from "./../../components/Productsdisplay"; // Adjust the path if necessary

const products = () => {
  return (
    <Layout>
      <div className="home-page mt-5">

        <Productsdisplay />
      </div>
    </Layout>
  );
};

export default products;
