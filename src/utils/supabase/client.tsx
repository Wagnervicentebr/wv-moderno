import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const projectId = 'lgfrnhhlutwahptczwko';
export const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZnJuaGhsdXR3YWhwdGN6d2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MTg5MDksImV4cCI6MjA1MDI5NDkwOX0.wKl-jSGGgvKPHOxSL2Bp58DKYpUcKjDFxX7XVDuG6N0';

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseInstance;
}