import { useState } from "react";
import AuthLayout from "./AuthLayout";

export default function Signup({ supabase, switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (!error) {
  await trackActivity(supabase, "signup");
}


  console.log("SIGNUP RESPONSE:", data, error);

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  if (data?.user) {
    await supabase.from("user_activity").insert({
      user_id: data.user.id,
      email: data.user.email,
      auth_event: "signup",
      user_agent: navigator.userAgent,
    });
  }

  alert("✅ Check your email to confirm.");
  setLoading(false);
};


  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="📧 Company Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="🔐 Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="primary-btn" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="auth-link" onClick={switchToLogin}>
          Back to Login
        </p>
      </form>
    </AuthLayout>
  );
}
