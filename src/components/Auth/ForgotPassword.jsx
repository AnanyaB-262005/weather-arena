import { useState } from "react";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword({ supabase, switchToLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert(error.message);
    else alert("📩 Reset link sent to your email");

    setLoading(false);
  };

  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleReset}>
        <h2>Reset Password</h2>

        <input
          type="email"
          placeholder="📧 Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="primary-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="auth-link" onClick={switchToLogin}>
          Back to Login
        </p>
      </form>
    </AuthLayout>
  );
}
