import { useEffect, useState } from "react";

/* Weather emoji mapping (Open-Meteo codes) */
const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤️";
  if (code === 45 || code === 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌧️";
  if (code === 95) return "⛈️";
  if (code >= 96) return "🌩️";
  return "🌍";
};

export default function WeatherCard({ city, onWeatherUpdate }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!city) return;

    const cityCoords = {
      Bengaluru: { lat: 12.9716, lon: 77.5946 },
      Hyderabad: { lat: 17.385, lon: 78.4867 },
      Chennai: { lat: 13.0827, lon: 80.2707 },
      Mumbai: { lat: 19.076, lon: 72.8777 },
    };

    const fetchWeather = async () => {
      try {
        setError(false);

        const { lat, lon } = cityCoords[city];

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`
        );

        const json = await res.json();

        if (!json.current_weather || !json.hourly) {
          throw new Error("Invalid API response");
        }

        /* Find current hour index */
        const currentHour = new Date().getHours();
        const humidity =
          json.hourly.relativehumidity_2m[currentHour] ??
          json.hourly.relativehumidity_2m[0];

        const weatherData = {
          temperature: json.current_weather.temperature,
          windspeed: json.current_weather.windspeed,
          weathercode: json.current_weather.weathercode,
          humidity,
        };

        setData(weatherData);
        onWeatherUpdate?.(weatherData);
      } catch (err) {
        console.error(err);
        setError(true);
        onWeatherUpdate?.(null);
      }
    };

    fetchWeather();
  }, [city, onWeatherUpdate]);

  if (error) return <p className="message error">⚠️ Unable to fetch weather</p>;
  if (!data) return <p className="message">⏳ Fetching live weather...</p>;

  return (
    <div className="weather-card-content">
      {/* Header */}
      <div className="weather-header">
        <span className="weather-city">{city}</span>
        <span className="weather-icon-inline">
          {getWeatherIcon(data.weathercode)}
        </span>
      </div>

      {/* Details */}
      <div className="weather-details">
        <div>
          🌡️ Temperature: <strong>{data.temperature}°C</strong>
        </div>
        <div>
          💧 Humidity: <strong>{data.humidity}%</strong>
        </div>
        <div>
          💨 Wind Speed: <strong>{data.windspeed} km/h</strong>
        </div>
      </div>
    </div>
  );
}
