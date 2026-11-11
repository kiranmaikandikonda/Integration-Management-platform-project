import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function APIStatus() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    api.get("/admin/api-status")
      .then((res) => {
        const data = res.data.data || res.data;
        setProviders(Array.isArray(data) ? data : data.providers || []);
      })
      .catch((err) => console.error("API status error:", err));
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="API Status"
        description="Monitor external service providers." />

      <div className="content-grid">
        {providers.map((provider, index) => (
          <div className="card" key={provider._id || index}>
            <h3>{provider.name}</h3>
            <p>Service: {provider.service || provider.type}</p>
            <p>Status: {provider.status || "Unknown"}</p>
          </div>
        ))}
      </div>

      {providers.length === 0 &&
        <p>No API provider information available.</p>}
    </div>
  );
}

export default APIStatus;
