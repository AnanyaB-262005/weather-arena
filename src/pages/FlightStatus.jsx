import React, { useState } from "react";
import { getFlightStatus } from "../api/api";

const FlightStatus = () => {
  const [flight, setFlight] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!flight) return alert("Enter flight number");
    setLoading(true);
    try {
      const data = await getFlightStatus(flight);
      setStatus(data);
    } catch (err) {
      alert("Error fetching flight status");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Flight Delay Checker</h2>
      <input
        type="text"
        placeholder="Flight Number"
        value={flight}
        onChange={(e) => setFlight(e.target.value)}
      />
      <button onClick={handleCheck}>Check</button>

      {loading && <p>Loading...</p>}

      {status && (
        <div className="card">
          <h3>{status.flight}</h3>
          <p>Departure: {status.departure}</p>
          <p>Arrival: {status.arrival}</p>
          <p>Estimated Delay: {status.delay}</p>
          <p>Weather Impact: {status.weatherImpact}</p>
          <p>Recommendation: {status.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default FlightStatus;
