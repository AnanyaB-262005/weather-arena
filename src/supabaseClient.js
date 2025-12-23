import { createClient } from "@supabase/supabase-js";

// Use environment variables or paste keys directly (not recommended for production)
const SUPABASE_URL = "https://hvrklcwkaivruthywpfh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cmtsY3drYWl2cnV0aHl3cGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMjExODYsImV4cCI6MjA4MTg5NzE4Nn0.K8y8FxUMgIaRvLpfAmmTpDB1D-oty4FQTmZvokIvS-0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
