import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Logout from "./components/Auth/Logout";

import WeatherCard from "./components/WeatherCard";
import TripPlanner from "./components/TripPlanner";
import FlightAssistant from "./components/FlightAssistant";
import HealthAdvisory from "./components/HealthAdvisory";

import { trackActivity } from "./utils/trackActivity";
import "./App.css";

/* 🔑 SUPABASE SETUP */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");

  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  /* ✅ AUTH SESSION LISTENER */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  /* ================= AUTH SCREENS ================= */
  if (!user) {
    if (authPage === "login") {
      return (
        <Login
          supabase={supabase}
          switchToSignup={() => setAuthPage("signup")}
          switchToForgot={() => setAuthPage("forgot")}
        />
      );
    }

    if (authPage === "signup") {
      return (
        <Signup
          supabase={supabase}
          switchToLogin={() => setAuthPage("login")}
        />
      );
    }

    if (authPage === "forgot") {
      return (
        <ForgotPassword
          supabase={supabase}
          switchToLogin={() => setAuthPage("login")}
        />
      );
    }
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="app-wrapper">
      {/* 🔓 LOGOUT BUTTON (TOP LEFT) */}
      <Logout supabase={supabase} />

      <div className="dashboard-wrapper">
        <h1 className="dashboard-title">🌤️ Weather Arena Dashboard</h1>

        {/* 🌍 CITY SELECTOR */}
        <div className="city-selector-container">
          <select
            value={city}
            onChange={async (e) => {
              const selectedCity = e.target.value;
              setCity(selectedCity);
              setWeatherInfo(null);

              if (selectedCity) {
                await trackActivity(
                  supabase,
                  "city_selected",
                  selectedCity
                );
              }
            }}
          >
            <option value="">Select a City</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* 🧩 DASHBOARD GRID */}
        {city && (
          <div className="dashboard-grid">
            <div className="dashboard-card weather-card">
              <WeatherCard
                city={city}
                onWeatherUpdate={setWeatherInfo}
              />
            </div>

            <div className="dashboard-card flight-card">
              <FlightAssistant
                city={city}
                weather={weatherInfo}
              />
            </div>

            <div className="dashboard-card trip-card">
              <TripPlanner
                city={city}
                weather={weatherInfo}
              />
            </div>

            <div className="dashboard-card health-card">
              <HealthAdvisory
                city={city}
                weather={weatherInfo}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
