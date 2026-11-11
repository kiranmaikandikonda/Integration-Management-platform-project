import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function Restaurants() {
  const [city, setCity] = useState("Hyderabad");
  const [restaurants, setRestaurants] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchRestaurants = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const res = await api.get("/food/restaurants", {
        params: { city }
      });

      const data = res.data.data || res.data;
      setRestaurants(
        Array.isArray(data) ? data : data.restaurants || []
      );
    } catch {
      setRestaurants([]);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Restaurants"
        description="Find restaurants in your destination." />

      <form onSubmit={searchRestaurants} className="search-form">
        <input value={city} onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city" required />
        <button>Search Restaurants</button>
      </form>

      <div className="content-grid">
        {restaurants.map((item, index) => (
          <div className="card" key={item._id || item.id || index}>
            <h3>{item.name}</h3>
            <p>{item.address}</p>
            <p>{item.cuisine}</p>
            <p>Rating: {item.rating ?? "Not available"}</p>
          </div>
        ))}
      </div>

      {searched && restaurants.length === 0 &&
        <p>No restaurants found for this search.</p>}
    </div>
  );
}

export default Restaurants;
