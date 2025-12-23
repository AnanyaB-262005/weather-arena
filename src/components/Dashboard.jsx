import { useState } from "react";
import WeatherCard from "./WeatherCard";
import TripPlanner from "./TripPlanner";
import FlightAssistant from "./FlightAssistant";
import HealthAdvisory from "./HealthAdvisory";
import AuthLayout from "./AuthLayout";
export default function Dashboard({ user, onLogout }) {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  return (
      <AuthLayout>
    <div className="dashboard-wrapper">
      <div className="header">
        <h1>🌤️ Weather Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </div>

      <select className="dropdown" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select a City</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Chennai">Chennai</option>
        <option value="Mumbai">Mumbai</option>
      </select>

      <div className="cards-grid">
        <div className="card weather-card">
          {city && <WeatherCard city={city} onWeatherUpdate={setWeatherInfo} />}
        </div>
        <div className="card flight-card">
          <FlightAssistant city={city} weather={weatherInfo} />
        </div>
        <div className="card trip-card">
          <TripPlanner city={city} weather={weatherInfo} />
        </div>
        <div className="card insight-card">
          <HealthAdvisory city={city} weather={weatherInfo} />
        </div>
      </div>
    </div>
    </AuthLayout>
  );
}
