import { supabase } from "./supabaseClient";

// Call your Supabase Edge Function for weather
export async function getWeather(city) {
  const { data, error } = await supabase.functions.invoke("get-weather", {
    body: { city },
  });
  if (error) throw error;
  return data;
}

// Call your Supabase Edge Function for flight
export async function getFlightStatus(flightNumber) {
  const { data, error } = await supabase.functions.invoke("check-flight", {
    body: { flightNumber },
  });
  if (error) throw error;
  return data;
}
