export default function TripPlanner({ city, weather }) {
  if (!city) return <p>📍 Select a city to get today’s trip plan</p>;
  if (!weather) return <p>⏳ Waiting for live weather...</p>;

  const { temperature, weathercode, windspeed } = weather;

  let places = [];
  let message = "";

  const isRainy = weathercode >= 61 && weathercode <= 82;
  const isHot = temperature >= 35;
  const isPleasant = temperature >= 25 && temperature < 35;
  const isCool = temperature < 25;

  /* ===== CITY + WEATHER BASED RECOMMENDATIONS ===== */

  if (city === "Bengaluru") {
    if (isRainy) {
      message = "🌧️ Rainy day – prefer indoor & covered places";
      places = ["Orion Mall", "Visvesvaraya Museum", "UB City"];
    } else if (isHot) {
      message = "🔥 Hot day – go out early or choose shaded spots";
      places = ["Cubbon Park (Morning)", "Lalbagh", "ISKCON Temple"];
    } else if (isPleasant) {
      message = "☀️ Pleasant weather – perfect for outdoor travel";
      places = ["Nandi Hills", "Cubbon Park", "MG Road"];
    } else if (isCool) {
      message = "❄️ Cool weather – great for relaxed sightseeing";
      places = ["Lalbagh", "Vidhana Soudha", "Art Galleries"];
    }
  }

  if (city === "Hyderabad") {
    if (isRainy) {
      message = "🌧️ Rainy day – avoid long outdoor walks";
      places = ["Forum Mall", "Salar Jung Museum", "Inorbit Mall"];
    } else if (isHot) {
      message = "🔥 Very hot – choose indoor or evening places";
      places = ["Birla Planetarium", "Tank Bund (Evening)", "City Mall"];
    } else if (isPleasant) {
      message = "☀️ Good weather – ideal for heritage spots";
      places = ["Charminar", "Golconda Fort", "Hussain Sagar"];
    } else if (isCool) {
      message = "❄️ Cool weather – best for history walks";
      places = ["Qutb Shahi Tombs", "Birla Mandir", "Necklace Road"];
    }
  }

  if (city === "Chennai") {
    if (isRainy) {
      message = "🌧️ Rainy – coastal areas not recommended";
      places = ["Express Avenue Mall", "Government Museum", "Phoenix Mall"];
    } else if (isHot) {
      message = "🔥 Hot & humid – go early morning only";
      places = ["Marina Beach (Morning)", "Elliot’s Beach", "Temples"];
    } else if (isPleasant) {
      message = "☀️ Pleasant – beach & heritage friendly";
      places = ["Marina Beach", "Kapaleeshwarar Temple", "Besant Nagar"];
    } else if (isCool) {
      message = "❄️ Cooler day – great for city exploration";
      places = ["Fort St. George", "Mylapore", "Beach Walks"];
    }
  }

  if (city === "Mumbai") {
    if (isRainy) {
      message = "🌧️ Heavy rain risk – stay indoors";
      places = ["Phoenix Mall", "Nehru Science Centre", "Art Galleries"];
    } else if (isHot) {
      message = "🔥 Hot & humid – avoid midday travel";
      places = ["Marine Drive (Morning)", "Juhu Beach (Evening)", "Malls"];
    } else if (isPleasant) {
      message = "☀️ Ideal Mumbai weather";
      places = ["Gateway of India", "Marine Drive", "Colaba Causeway"];
    } else if (isCool) {
      message = "❄️ Cool breeze – best for outdoor walks";
      places = ["Bandra Fort", "Sanjay Gandhi NP", "Seafront Walks"];
    }
  }

  return (
    <div>
      <h3>🧭 Today’s Trip Plan</h3>

      <p><strong>{message}</strong></p>

      <p>
        <strong>📍 Best places today:</strong><br />
        {places.join(", ")}
      </p>

      <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
        Based on live weather of {city} (Today only)
      </p>
    </div>
  );
}
