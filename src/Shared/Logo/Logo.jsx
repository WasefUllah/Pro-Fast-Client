import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-end">
        <img src={logo} alt="" className="mb-2" />
        <p className="font-extrabold text-3xl -ml-2">PROFAST</p>
      </div>
    </Link>
  );
};

export default Logo;
