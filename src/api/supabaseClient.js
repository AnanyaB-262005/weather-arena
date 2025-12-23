import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project details
const SUPABASE_URL = "https://virpuduztjcqcdpvkbsx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_SDAHpe7erabiy_80PwIkLQ_06EU-m50";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
