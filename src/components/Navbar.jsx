import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Droplet, Menu, X } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-sky-500 font-semibold"
      : "text-gray-700 hover:text-sky-500 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Droplet className="text-sky-500 hover:text-sky-600 transition duration-200" />
          <span className="text-2xl font-bold text-gray-800">AquaPay</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/service" className={linkClass}>
            Services
          </NavLink>
          {user?.role === "user" && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin Panel
            </NavLink>
          )}
        </div>

     
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 font-medium rounded-md text-gray-700 hover:text-white hover:bg-sky-500 transition"
              >
                Login
              </button>
              <Link to="/signup">
                <button className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-medium text-red-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

      
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-6 py-6 space-y-4 flex flex-col items-center">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/service"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Services
          </NavLink>
          {user?.role === "user" && (
            <NavLink
              to="/dashboard"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </NavLink>
          )}

          {!user ? (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="w-full py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-sky-500 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setOpen(false);
                }}
                className="w-full py-2 rounded-md bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-md text-red-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
