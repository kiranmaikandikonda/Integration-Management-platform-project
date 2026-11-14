import { useEffect, useState } from "react";
import { CloudSun, Plane, Utensils, MapPin } from "lucide-react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import PageHeader from "../components/PageHeader";
import useAuth from "../hooks/useAuth";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    searches: 0,
    destinations: 0,
    food: 0,
    maps: 0
  });

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => setStats(res.data.stats || res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="page-container">
      <PageHeader
        title={`Welcome, ${user?.name || "Traveler"}!`}
        description="Explore weather, destinations, food and more."
      />

      <div className="dashboard-grid">
        <StatCard title="Total Searches" value={stats.searches}
          icon={<CloudSun />} description="Your searches" />

        <StatCard title="Destinations" value={stats.destinations}
          icon={<Plane />} description="Travel destinations" />

        <StatCard title="Food Places" value={stats.food}
          icon={<Utensils />} description="Food discoveries" />

        <StatCard title="Map Searches" value={stats.maps}
          icon={<MapPin />} description="Places explored" />
      </div>

      <div className="card dashboard-welcome">
        <h2>Explore the World</h2>
        <p>
          Discover destinations, check weather, find restaurants
          and use AI-powered travel assistance.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
