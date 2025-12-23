import React, { useState } from "react";
import { getWeather } from "../api/api";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return alert("Enter a city");
    setLoading(true);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      alert("Error fetching weather");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Weather Checker</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Check Weather</button>

      {loading && <p>Loading...</p>}

      {weather && (
        <div className="card">
          <h3>{weather.city}</h3>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
          <p>Recommendation: {weather.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

