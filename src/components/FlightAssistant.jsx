import { useState } from "react";

export default function FlightAssistant({ city, weather }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleQuery = () => {
    if (!weather) {
      setResponse("⏳ Weather data not available yet. Please wait.");
      return;
    }

    const { weathercode, windspeed, temperature } = weather;
    const q = query.toLowerCase();

    let answer = "ℹ️ Here's what I found:\n";

    if (q.includes("best time")) {
      if (weathercode === 45 || weathercode === 48)
        answer += "🕒 Afternoon or evening is best; avoid early morning fog.";
      else if (weathercode >= 61 && weathercode <= 82)
        answer += "🕒 Afternoon flights preferred; rain may cause delays.";
      else if (windspeed > 30)
        answer += "🕒 Morning or late evening preferred due to strong winds.";
      else
        answer += "🕒 Any time is good; clear skies today.";
    }

    if (q.includes("delay") || q.includes("risk")) {
      if (weathercode >= 61 && weathercode <= 82) answer += "\n⚠️ High chance of delay due to rain.";
      else if (windspeed > 30) answer += "\n⚠️ Medium delay risk due to strong winds.";
      else answer += "\n✅ Low risk of delay; flights likely on time.";
    }

    if (q.includes("weather")) {
      answer += `\n🌡️ Temperature: ${temperature}°C, 💨 Windspeed: ${windspeed} km/h`;
    }

    if (answer === "ℹ️ Here's what I found:\n") {
      answer = "🤔 Sorry, I couldn't understand your question. Try asking about 'best time', 'delay', or 'weather'.";
    }

    setResponse(answer);
  };

  return (
    <div>
      <h3>✈️ Flight Assistant</h3>
      <input
        type="text"
        placeholder="Ask about flights..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleQuery} style={{ padding: "10px 20px", borderRadius: "8px" }}>Ask</button>

      {response && (
        <pre style={{ marginTop: "10px", background: "#f2f2f2", padding: "10px", borderRadius: "8px" }}>
          {response}
        </pre>
      )}
    </div>
  );
}
