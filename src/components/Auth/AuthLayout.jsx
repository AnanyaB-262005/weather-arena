export default function AuthLayout({ children }) {
  return (
    <div className="weather-auth-bg">
      {/* SKY */}
      <div className="auth-sky"></div>
      <div className="auth-sun"></div>

      {/* CLOUDS */}
      <div className="auth-cloud cloud-1"></div>
      <div className="auth-cloud cloud-2"></div>
      <div className="auth-cloud cloud-3"></div>

      {children}
    </div>
  );
}
