import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useData } from "../../auth/DataContext";
import {
  LayoutDashboard,
  Users,
  Receipt,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Bell,
} from "lucide-react";

function AdminDashboard() {
  const { logout, user } = useAuth();
  const { users, bills } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Users, label: "Users", path: "./users" },
    { icon: Receipt, label: "Bills", path: "./bills" },
  ];

  const breadcrumb = location.pathname
    .split("/")
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1));

  //  LIVE STATS
  const totalUsers = users?.length || 0;

  const totalPaid =
    bills
      ?.filter((b) => b.status === "Paid")
      .reduce((sum, b) => sum + parseFloat(b.amount), 0) || 0;

  const totalUnpaid =
    bills
      ?.filter((b) => b.status === "Pending")
      .reduce((sum, b) => sum + parseFloat(b.amount), 0) || 0;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-indigo-950 text-white flex flex-col shadow-2xl z-30 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        
        <div className="p-8 pb-4 border-b border-indigo-900/50">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/40">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              AquaPay
            </h2>
          </div>
          <p className="text-xs text-indigo-300 font-medium uppercase tracking-wider">
            Admin Portal
          </p>
        </div>

       
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-indigo-200 hover:bg-white/5 hover:text-white"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        
        <div className="p-4 m-4 bg-indigo-900/50 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              {user?.name?.[0] || "A"}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-indigo-300">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-red-300 hover:text-red-200 flex items-center gap-2"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto">
       
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-10 px-8 py-5 border-b border-gray-200/50 hidden lg:flex justify-between items-start">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-sm text-gray-500">
              Here's a quick overview of your platform today.
            </p>

            {/* Quick Stats Cards */}
            <div className="mt-4 flex gap-4">
              <div className="bg-indigo-100/50 p-4 rounded-xl shadow flex-1">
                <h4 className="text-xs font-semibold text-indigo-600 uppercase">
                  Total Users
                </h4>
                <p className="text-xl font-bold text-indigo-800">
                  {totalUsers}
                </p>
              </div>
              <div className="bg-green-100/50 p-4 rounded-xl shadow flex-1">
                <h4 className="text-xs font-semibold text-green-600 uppercase">
                  Total Paid
                </h4>
                <p className="text-xl font-bold text-green-800">${totalPaid}</p>
              </div>
              <div className="bg-red-100/50 p-4 rounded-xl shadow flex-1">
                <h4 className="text-xs font-semibold text-red-600 uppercase">
                  Total Unpaid
                </h4>
                <p className="text-xl font-bold text-red-800">${totalUnpaid}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 relative mt-2">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100/20">
              <Bell size={20} />
            </button>

            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold cursor-pointer ring-2 ring-indigo-800"
              >
                {user?.name?.[0]}
              </div>
              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-30">
                  <p className="px-4 py-2 text-sm text-gray-700">
                    {user?.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">AquaPay</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg border border-gray-200"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Breadcrumb */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto text-sm text-gray-500">
          Admin / {breadcrumb.join(" / ")}
        </div>

        {/* Main Outlet Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
