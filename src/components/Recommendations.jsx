export default function Recommendations({ city }) {
  if (!city) return null;

  return (
    <div className="recommend-box">
      <h3>✨ Recommendations for {city}</h3>
      <ul>
        <li>🧴 Wear sunscreen</li>
        <li>💧 Stay hydrated</li>
        <li>📡 Check flight timings</li>
        <li>👕 Wear comfortable clothes</li>
      </ul>
    </div>
  );
}
