import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import "./Map.css";

function Maps() {
  const [query, setQuery] = useState("Charminar Hyderabad");
  const [places, setPlaces] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchPlaces = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const res = await api.get("/maps", {
        params: { query }
      });

      const data = res.data.data || res.data;
      setPlaces(Array.isArray(data) ? data : data.places || []);
    } catch {
      setPlaces([]);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Explore Maps"
        description="Search for places and attractions." />

      <form onSubmit={searchPlaces} className="search-form">
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places" required />
        <button>Find Places</button>
      </form>

      {places.map((place, index) => (
        <div className="card" key={place.id || index}>
          <h3>{place.name}</h3>
          <p>{place.address || place.display_name}</p>
          {place.lat && place.lon && (
            <a
              href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Map
            </a>
          )}
        </div>
      ))}

      {searched && places.length === 0 && <p>No places found.</p>}
    </div>
  );
}

export default Maps;
