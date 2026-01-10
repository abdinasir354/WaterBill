import { Routes,Route, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/publicpages/About"
import Home from "./pages/publicpages/Home"
import Login from "./pages/publicpages/Login"
import Signup from "./pages/publicpages/Signup"
import Service from "./pages/publicpages/Service"
import ProtectedRoute from "./components/ProtectedRoute"

// Admin Components
import AdminDashboard from "./pages/adminpages/AdminDashboard"
import Users from "./pages/adminpages/Users"
import Bills from "./pages/adminpages/Bills"

// User Components
import UserDashboard from "./pages/userpages/UserDashboard"
import Payments from "./pages/userpages/Payments"

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {

  return (
    <Routes>
      {/* Public Routes with Navbar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div className="p-4"><h3>Welcome Admin! Select an item from the sidebar.</h3></div>} />
          <Route path="users" element={<Users />} />
          <Route path="bills" element={<Bills />} />
        </Route>
      </Route>

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
        <Route path="/dashboard" element={<UserDashboard />}>
           <Route index element={<div className="p-4"><h3>Welcome! View your payments/balance here.</h3></div>} />
           <Route path="payments" element={<Payments />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
