import React from "react";
import { Link, NavLink } from "react-router"; 
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const items = (
    <div className="flex flex-col lg:flex-row gap-2 font-semibold text-lg">
      <NavLink to="/" className="hover:text-primary">
        Home
      </NavLink>
      <NavLink to="/coverage" className="hover:text-primary">
        Coverage
      </NavLink>
      <NavLink to="/sendParcel" className="hover:text-primary">
        Send Parcel
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className="hover:text-primary">
          Dashboard
        </NavLink>
      )}
      <NavLink to="/about" className="hover:text-primary">
        About us
      </NavLink>
    </div>
  );

  const handleLogout = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div
      data-aos="fade-down"
      className="navbar bg-base-100 shadow-sm my-4 rounded-2xl hover:shadow-md z-50 relative"
    >
      {/* Left side - Logo & Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow flex flex-col gap-2"
          >
            {items}
          </div>
        </div>
        <Logo />
      </div>

      {/* Center - Menu (large screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{items}</ul>
      </div>

      {/* Right side - Auth buttons */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-primary text-black font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary text-black font-semibold">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
