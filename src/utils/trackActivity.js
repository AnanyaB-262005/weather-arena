export const trackActivity = async (
  supabase,
  event,
  city = null
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("visitor_activity").insert({
    user_id: user.id,
    email: user.email,
    event,
    city,
    user_agent: navigator.userAgent,
  });
};
