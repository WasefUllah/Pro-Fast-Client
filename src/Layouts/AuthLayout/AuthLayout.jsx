import React from "react";
import authImg from "../../assets/authImage.png";
import { Outlet } from "react-router";
import Logo from "../../Shared/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className=" bg-base-200 p-12">
      <div>
        <Logo></Logo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
