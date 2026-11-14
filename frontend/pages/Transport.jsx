import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import "./Transport.css";

function Transport() {
  const [city, setCity] = useState("Hyderabad");
  const [transport, setTransport] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchTransport = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const res = await api.get("/transport", {
        params: { city }
      });

      const data = res.data.data || res.data;
      setTransport(
        Array.isArray(data) ? data : data.transport || []
      );
    } catch {
      setTransport([]);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Transport"
        description="Explore available transport options." />

      <form onSubmit={searchTransport} className="search-form">
        <input value={city} onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city" required />
        <button>Search Transport</button>
      </form>

      <div className="content-grid">
        {transport.map((item, index) => (
          <div className="card" key={item._id || item.id || index}>
            <h3>{item.type || item.name}</h3>
            <p>{item.description}</p>
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>

      {searched && transport.length === 0 &&
        <p>No transport information available.</p>}
    </div>
  );
}

export default Transport;
