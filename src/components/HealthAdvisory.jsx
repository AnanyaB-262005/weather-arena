export default function HealthAdvisory({ city, weather }) {
  if (!city) return <div>📍 Select a city</div>;
  if (!weather) return <div>⏳ Loading weather...</div>;

  const { temperature, windspeed, weathercode, humidity } = weather;

  let uvRisk = "Low";
  let dehydrationRisk = "Low";
  let breathingComfort = "Good";
  let notes = [];

  if (temperature >= 38) {
    uvRisk = "Very High";
    dehydrationRisk = "Severe";
    notes.push("Avoid sun exposure");
    notes.push("Drink water frequently");
  } else if (temperature >= 34) {
    uvRisk = "High";
    dehydrationRisk = "High";
    notes.push("Use sunscreen & cap");
  } else if (temperature >= 30) {
    uvRisk = "Moderate";
    dehydrationRisk = "Moderate";
    notes.push("Carry water");
  }

  if (humidity >= 75) notes.push("High humidity – fatigue risk");
  if (windspeed > 30) breathingComfort = "Poor";
  if (weathercode >= 61 && weathercode <= 82)
    notes.push("Rain improves air quality");

  notes = [...new Set(notes)].slice(0, 3); // limit height

  return (
    <div style={{ fontSize: "16px", lineHeight: "1.45" }}>
      <div><h3> 🩺Health & Safety</h3></div>
      <div>☀️ UV Risk: {uvRisk}</div>
      <div>💧 Dehydration: {dehydrationRisk}</div>
      <div>🌬️ Breathing: {breathingComfort}</div>

      {notes.map((n, i) => (
        <div key={i}>✔ {n}</div>
      ))}

      <div style={{ fontSize: "11px", color: "#666" }}>
      </div>
    </div>
  );
}
