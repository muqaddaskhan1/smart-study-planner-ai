/*
# Upgrade study planner to multi-user with authentication

1. Overview
   Converts the single-tenant study planner into a multi-user application
   with Supabase email/password auth. Each user's plans, tasks, profile,
   and settings are isolated via RLS scoped to auth.uid().

2. New Tables
   - profiles: per-user profile (full_name, avatar_url)
   - user_settings: per-user settings (notifications, reminder_time, theme)

3. Modified Tables
   - study_plans: added user_id column (DEFAULT auth.uid())

4. Security
   - study_plans: authenticated-only, owner-scoped CRUD
   - study_tasks: authenticated-only, scoped via parent plan's user_id
   - profiles: authenticated-only, owner-scoped CRUD
   - user_settings: authenticated-only, owner-scoped CRUD
   - study_tips: unchanged (shared reference data, read-only)
*/

-- Add user_id to study_plans
ALTER TABLE study_plans ADD COLUMN IF NOT EXISTS user_id uuid DEFAULT auth.uid();

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  notifications_enabled boolean NOT NULL DEFAULT true,
  reminder_time time NOT NULL DEFAULT '18:00',
  theme text NOT NULL DEFAULT 'light',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_settings" ON user_settings;
CREATE POLICY "select_own_settings" ON user_settings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_settings" ON user_settings;
CREATE POLICY "insert_own_settings" ON user_settings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_settings" ON user_settings;
CREATE POLICY "update_own_settings" ON user_settings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_settings" ON user_settings;
CREATE POLICY "delete_own_settings" ON user_settings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Update study_plans policies to authenticated-only, owner-scoped
DROP POLICY IF EXISTS "anon_select_study_plans" ON study_plans;
DROP POLICY IF EXISTS "anon_insert_study_plans" ON study_plans;
DROP POLICY IF EXISTS "anon_update_study_plans" ON study_plans;
DROP POLICY IF EXISTS "anon_delete_study_plans" ON study_plans;

DROP POLICY IF EXISTS "select_own_study_plans" ON study_plans;
CREATE POLICY "select_own_study_plans" ON study_plans FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_study_plans" ON study_plans;
CREATE POLICY "insert_own_study_plans" ON study_plans FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_study_plans" ON study_plans;
CREATE POLICY "update_own_study_plans" ON study_plans FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_study_plans" ON study_plans;
CREATE POLICY "delete_own_study_plans" ON study_plans FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Update study_tasks policies to authenticated-only, scoped via parent plan
DROP POLICY IF EXISTS "anon_select_study_tasks" ON study_tasks;
DROP POLICY IF EXISTS "anon_insert_study_tasks" ON study_tasks;
DROP POLICY IF EXISTS "anon_update_study_tasks" ON study_tasks;
DROP POLICY IF EXISTS "anon_delete_study_tasks" ON study_tasks;

DROP POLICY IF EXISTS "select_own_study_tasks" ON study_tasks;
CREATE POLICY "select_own_study_tasks" ON study_tasks FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM study_plans WHERE study_plans.id = study_tasks.plan_id AND study_plans.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_study_tasks" ON study_tasks;
CREATE POLICY "insert_own_study_tasks" ON study_tasks FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM study_plans WHERE study_plans.id = study_tasks.plan_id AND study_plans.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "update_own_study_tasks" ON study_tasks;
CREATE POLICY "update_own_study_tasks" ON study_tasks FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM study_plans WHERE study_plans.id = study_tasks.plan_id AND study_plans.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM study_plans WHERE study_plans.id = study_tasks.plan_id AND study_plans.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_study_tasks" ON study_tasks;
CREATE POLICY "delete_own_study_tasks" ON study_tasks FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM study_plans WHERE study_plans.id = study_tasks.plan_id AND study_plans.user_id = auth.uid())
  );

-- Add index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_study_plans_user_id ON study_plans(user_id);
