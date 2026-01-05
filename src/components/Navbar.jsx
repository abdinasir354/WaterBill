import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Droplet, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-aqua font-semibold"
      : "text-slate hover:text-aqua transition";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg text-black backdrop-blur-md border-b border-white/10 py-4 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Droplet className="text-sky-500 hover:text-sky-600 transition duration-200" />

          <span className="text-2xl font-bold text-black">AquaPay</span>
        </div>

        <div className="hidden md:flex gap-8">
          <NavLink
            to="/"
            className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full "
          >
            Home
          </NavLink>
          <NavLink to="/about" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full ">
            About
          </NavLink>
          <NavLink to="/Service" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full ">
            Services
          </NavLink>

          {user && user.role === "user" && (
            <NavLink to="/dashboard" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full ">
              Dashboard
            </NavLink>
          )}

          {user && user.role === "admin" && (
            <NavLink to="/admin" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full ">
              Admin Panel
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-slate hover:text-aqua bg-"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-aqua text-navy-900 px-4 py-2 rounded-lg font-semibold"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          )}
        </div>

        <button className="md:hidden text-black" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col text-center bg-navy-900 border-t border-white/10 px-6 py-6 space-y-4">
          <NavLink to="/" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full " onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full "
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/Service"
            className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full "
            onClick={() => setOpen(false)}
          >
            Services
          </NavLink>

          {user && user.role === "user" && (
            <NavLink to="/dashboard" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full ">
              Dashboard
            </NavLink>
          )}

          {user && user.role === "admin" && (
            <NavLink to="/admin" className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-200 hover:after:w-full ">
              Admin Panel
            </NavLink>
          )}

          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="block text-slate"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="block text-aqua"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button onClick={logout} className="text-red-400">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
