import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import "./Travel.css";

function Travel() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/travel")
      .then((res) => {
        const data = res.data.data || res.data;
        setPlaces(Array.isArray(data) ? data : data.places || []);
      })
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="Travel Destinations"
        description="Discover popular places to visit." />

      {loading ? <Loader /> : (
        <div className="content-grid">
          {places.map((place, index) => (
            <div className="card" key={place._id || place.id || index}>
              {place.image && <img className="place-image" src={place.image} alt={place.name} />}
              <h3>{place.name || place.destination}</h3>
              <p>{place.description}</p>
              <p>{place.country}</p>
              {place.category && <span>{place.category}</span>}
            </div>
          ))}
          {places.length === 0 && <p>No destinations available yet.</p>}
        </div>
      )}
    </div>
  );
}

export default Travel;
