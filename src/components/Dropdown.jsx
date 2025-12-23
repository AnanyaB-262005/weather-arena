import React from "react";

const cities = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Pune"
];

export default function Dropdown({ setCity }) {
  return (
    <>
      <select
        className="dropdown"
        onChange={(e) => setCity(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select a City</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}
