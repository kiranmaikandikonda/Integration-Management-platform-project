import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function Weather() {
  const [city, setCity] = useState("Hyderabad");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const searchWeather = async (e) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    try {
      const res = await api.get("/weather", { params: { city } });
      setWeather(res.data.data || res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Weather not available");
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Weather"
        description="Check weather conditions in your destination." />

      <form onSubmit={searchWeather} className="search-form">
        <input value={city} onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name" required />
        <button>Search Weather</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="card result-card">
          <h2>{weather.city || city}</h2>
          <h1>{weather.temperature ?? weather.current?.temperature_2m ?? "--"}°C</h1>
          <p>{weather.description || weather.condition || "Current weather"}</p>
          <p>Humidity: {weather.humidity ?? weather.current?.relative_humidity_2m ?? "--"}%</p>
          <p>Wind: {weather.windSpeed ?? weather.current?.wind_speed_10m ?? "--"}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
