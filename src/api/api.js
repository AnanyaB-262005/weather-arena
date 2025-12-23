import { supabase } from "./supabaseClient";

export async function getWeather(city) {
  const { data, error } = await supabase.functions.invoke("get-weather", {
    body: { city },
  });
  if (error) throw error;
  return data;
}

export async function getFlightStatus(flightNumber) {
  const { data, error } = await supabase.functions.invoke("check-flight", {
    body: { flightNumber },
  });
  if (error) throw error;
  return data;
}
