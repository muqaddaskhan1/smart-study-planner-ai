import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type StudyPlan = {
  id: string;
  user_id: string;
  subject: string;
  exam_date: string;
  daily_hours: number;
  total_days: number;
  created_at: string;
};

export type StudyTask = {
  id: string;
  plan_id: string;
  day_number: number;
  task_date: string;
  title: string;
  description: string;
  topic: string;
  duration_minutes: number;
  completed: boolean;
  created_at: string;
};

export type StudyTip = {
  id: string;
  text: string;
  category: string;
};

export type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

export type UserSettings = {
  id: string;
  user_id: string;
  notifications_enabled: boolean;
  reminder_time: string;
  theme: string;
  created_at: string;
  updated_at: string;
};
