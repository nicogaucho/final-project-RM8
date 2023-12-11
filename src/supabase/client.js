import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabaseUrl = 'https://ulovwvhtsiyhnioiqbdo.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsb3Z3dmh0c2l5aG5pb2lxYmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NjM1MDAsImV4cCI6MjAxNjMzOTUwMH0.nXTQD-b6f4ilgishLa_vd66Uat-9E4vkCXcUsNtEhrg';
const supabase = createClient(supabaseUrl, supabaseKey, {
  multiTab: false,
});

export default supabase;
