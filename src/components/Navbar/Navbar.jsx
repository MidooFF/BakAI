import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav section-padding shadow-0">
      <div className="links">
        <NavLink to="/">
          <h1>الخدمات</h1>
        </NavLink>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
