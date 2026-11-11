import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Loader from "./components/Loader";
import useAuth from "./hooks/useAuth";

// Authentication pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPVerify from "./pages/OTPVerify";

// User pages
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Travel from "./pages/Travel";
import Food from "./pages/Food";
import Restaurants from "./pages/Restaurants";
import Maps from "./pages/Maps";
import Transport from "./pages/Transport";
import AIChat from "./pages/AIChat";
import VoiceAssistantPage from "./pages/VoiceAssistantPage";
import ImageTranslation from "./pages/ImageTranslation";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import APIStatus from "./pages/APIStatus";
import RequestLogs from "./pages/RequestLogs";

// Main application layout
function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-verify" element={<OTPVerify />} />

      {/* Protected user routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/food" element={<Food />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/voice" element={<VoiceAssistantPage />} />
          <Route path="/image-translation" element={<ImageTranslation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/api-status" element={<APIStatus />} />
            <Route path="/admin/request-logs" element={<RequestLogs />} />
          </Route>
        </Route>
      </Route>

      {/* Unknown route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
