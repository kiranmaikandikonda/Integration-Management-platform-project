import { useEffect, useState } from "react";
import api from "../src/services/api";
import PageHeader from "../components/PageHeader";
import "./Food.css";

function Food() {
  const [city, setCity] = useState("Hyderabad");
  const [foods, setFoods] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchFood = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      const res = await api.get("/food", { params: { city } });
      const data = res.data.data || res.data;
      setFoods(Array.isArray(data) ? data : data.foods || []);
    } catch {
      setFoods([]);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Local Food"
        description="Discover famous local dishes." />

      <form onSubmit={searchFood} className="search-form">
        <input value={city} onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city" required />
        <button>Find Food</button>
      </form>

      <div className="content-grid">
        {foods.map((food, index) => (
          <div className="card" key={food._id || food.id || index}>
            {food.image && <img className="place-image" src={food.image} alt={food.name} />}
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>{food.city || city}</p>
          </div>
        ))}
      </div>

      {searched && foods.length === 0 && <p>No food information found.</p>}
    </div>
  );
}

export default Food;
