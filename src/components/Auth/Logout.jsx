export default function Logout({ supabase }) {
  const handleLogout = async () => {
    // 🔍 Get current user
    const { data } = await supabase.auth.getUser();
    
  await trackActivity(supabase, "logout");
  await supabase.auth.signOut();


    // 📝 Log logout activity
    if (data?.user) {
      await supabase.from("user_activity").insert({
        user_id: data.user.id,
        email: data.user.email,
        auth_event: "logout",
        user_agent: navigator.userAgent,
      });
    }

    // 🚪 Sign out
    await supabase.auth.signOut();
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}
