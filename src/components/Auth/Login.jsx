import { useState } from "react";
import AuthLayout from "./AuthLayout";

export default function Login({ supabase, switchToSignup, switchToForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (!error) {
  await trackActivity(supabase, "login");
}

  console.log("LOGIN RESPONSE:", data, error);

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  if (data?.user) {
    const insertRes = await supabase.from("user_activity").insert({
      user_id: data.user.id,
      email: data.user.email,
      auth_event: "login",
      user_agent: navigator.userAgent,
    });

    console.log("INSERT RESULT:", insertRes);
  }

  setLoading(false);
};


  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleLogin}>
        <h1 className="auth-title">☁️ Weather Arena</h1>
        <p className="auth-subtitle">Smart Weather & Travel Insights</p>

        <input
          type="email"
          placeholder="📧 Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="primary-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link" onClick={switchToForgot}>
          Forgot password?
        </p>

        <p className="auth-switch">
          New here? <span onClick={switchToSignup}>Create account</span>
        </p>
      </form>
    </AuthLayout>
  );
}
