import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo-icon.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav section-padding shadow-0">
      <div className="links">
        <NavLink to="/services">
          <h1>الخدمات</h1>
        </NavLink>
      </div>
      <div className="logo flex  w-fit">
        <div className="logo-text w-fit gradient-reverse text-4xl flex items-center max-sm:text-3xl text-transparent ml-[5px]">
          BacAI
        </div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
