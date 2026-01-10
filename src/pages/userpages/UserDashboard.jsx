import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useData } from "../../auth/DataContext";
import {
  LayoutDashboard,
  CreditCard,
  LogOut,
  Droplet,
  Menu,
  X,
  Bell,
} from "lucide-react";

function UserDashboard() {
  const { logout, user } = useAuth();
  const { bills } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: CreditCard, label: "Payments", path: "./payments" },
  ];


  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((crumb, index, arr) => ({
      label: crumb.charAt(0).toUpperCase() + crumb.slice(1),
      path: "/" + arr.slice(0, index + 1).join("/"),
    }));

  
  const userBills = bills?.filter((b) => b.userId === user?.id) || [];
  const totalPaid = userBills
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + parseFloat(b.amount), 0);
  const totalUnpaid = userBills
    .filter((b) => b.status === "Pending")
    .reduce((sum, b) => sum + parseFloat(b.amount), 0);

 
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
     
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-indigo-950 text-white flex flex-col shadow-sm z-30 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Droplet className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              AquaPay
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider pl-13 ml-13">
            User Portal
          </p>
        </div>

       
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100 translate-x-1"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                }`
              }
            >
              <item.icon
                size={20}
                className={`transition-transform duration-200 group-hover:scale-110`}
              />
              <span className="font-medium">{item.label}</span>
              {location.pathname === item.path && (
                <span className="absolute left-0 h-full w-1 bg-cyan-500 rounded-tr-lg rounded-br-lg" />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setUserDropdown(!userDropdown)}
          >
            {user?.name?.[0] || "U"}
          </div>
          <p className="text-sm font-bold text-gray-900 mt-2">{user?.name}</p>
          <p className="text-xs text-gray-500">Standard Plan</p>

         
          {userDropdown && (
            <div className="mt-3 w-full bg-white rounded-lg shadow-md border border-gray-200 text-gray-800 py-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        />
      )}

    
      <main className="flex-1 overflow-y-auto bg-gray-50">
        
        <header className="bg-white sticky top-0 z-10 px-8 py-5 border-b border-gray-200 hidden lg:flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {greeting}, {user?.name} 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Overview of your payments and billing status.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Bell
                size={20}
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
              />
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md cursor-pointer"
                onClick={() => setUserDropdown(!userDropdown)}
              >
                {user?.name?.[0] || "U"}
              </div>
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
              <span className="text-xs font-medium text-gray-500 uppercase">
                Total Paid
              </span>
              <span className="text-xl font-bold text-green-600 mt-1">
                ${totalPaid}
              </span>
              <div className="h-1 w-full bg-green-200 rounded-full mt-2">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{
                    width: `${
                      totalPaid + totalUnpaid === 0
                        ? 0
                        : (totalPaid / (totalPaid + totalUnpaid)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
              <span className="text-xs font-medium text-gray-500 uppercase">
                Total Unpaid
              </span>
              <span className="text-xl font-bold text-red-600 mt-1">
                ${totalUnpaid}
              </span>
              <div className="h-1 w-full bg-red-200 rounded-full mt-2">
                <div
                  className="h-1 bg-red-500 rounded-full"
                  style={{
                    width: `${
                      totalPaid + totalUnpaid === 0
                        ? 0
                        : (totalUnpaid / (totalPaid + totalUnpaid)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
              <span className="text-xs font-medium text-gray-500 uppercase">
                Number of Bills
              </span>
              <span className="text-xl font-bold text-indigo-600 mt-1">
                {userBills.length}
              </span>
            </div>
          </div>
        </header>

     
        <header className="lg:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">AquaPay</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg border border-gray-200"
          >
            <Menu size={22} />
          </button>
        </header>

 
        <div className="px-6 lg:px-10 pt-6">
          <nav className="text-sm text-gray-500 mb-4 flex gap-1 flex-wrap">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx}>
                <NavLink to={crumb.path} className="hover:underline">
                  {crumb.label}
                </NavLink>
                {idx < breadcrumbs.length - 1 && <span> / </span>}
              </span>
            ))}
          </nav>
        </div>

     
        <div className="p-6 lg:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
