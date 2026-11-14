import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { Users, Activity, FileText } from "lucide-react";
import "./AdminDashboard.css";
function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAPIs: 0,
    totalRequests: 0
  });

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => setStats(res.data.stats || res.data))
      .catch((err) => console.error("Dashboard error:", err));
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="Admin Dashboard"
        description="Monitor your platform." />

      <div className="dashboard-grid">
        <StatCard title="Total Users"
          value={stats.totalUsers ?? 0}
          icon={<Users />} description="Registered users" />

        <StatCard title="Active APIs"
          value={stats.activeAPIs ?? 0}
          icon={<Activity />} description="Available APIs" />

        <StatCard title="Total Requests"
          value={stats.totalRequests ?? 0}
          icon={<FileText />} description="Platform requests" />
      </div>
    </div>
  );
}

export default AdminDashboard;
