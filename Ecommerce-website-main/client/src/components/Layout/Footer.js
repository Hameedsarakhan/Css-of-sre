import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css"; // Import your CSS file for additional styling if needed

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-light py-4 mt-auto">
      <h1 className="h6 mb-2">All Rights Reserved &copy; Pasta on the Plate</h1>
      <p className="mb-0">
        <Link to="/about" className="mx-2 text-light">About</Link> | 
        <Link to="/contact" className="mx-2 text-light">Contact</Link> | 
        <Link to="/policy" className="mx-2 text-light">Privacy Policy</Link>
      </p>
    </footer>
  );
};

export default Footer;
