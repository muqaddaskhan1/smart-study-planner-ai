/*
# Create study planner tables (single-tenant, no auth)

1. New Tables
- `study_plans`: stores each generated study plan
  - id (uuid, primary key)
  - subject (text, not null) - the subject name
  - exam_date (date, not null) - the exam date
  - daily_hours (numeric, not null) - study hours per day
  - total_days (integer) - number of days until exam
  - created_at (timestamptz)
- `study_tasks`: individual daily tasks belonging to a plan
  - id (uuid, primary key)
  - plan_id (uuid, foreign key to study_plans, cascade delete)
  - day_number (integer) - which day in the plan
  - task_date (date) - the date of the task
  - title (text) - task title
  - description (text) - task details
  - topic (text) - study topic
  - duration_minutes (integer) - estimated duration
  - completed (boolean, default false)
  - created_at (timestamptz)
- `study_tips`: motivational study tips (seeded)
  - id (uuid, primary key)
  - text (text, not null)
  - category (text)

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (single-tenant no-auth app).
*/

CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  exam_date date NOT NULL,
  daily_hours numeric NOT NULL,
  total_days integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_study_plans" ON study_plans;
CREATE POLICY "anon_select_study_plans" ON study_plans FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_study_plans" ON study_plans;
CREATE POLICY "anon_insert_study_plans" ON study_plans FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_study_plans" ON study_plans;
CREATE POLICY "anon_update_study_plans" ON study_plans FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_study_plans" ON study_plans;
CREATE POLICY "anon_delete_study_plans" ON study_plans FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS study_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  task_date date NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  topic text NOT NULL DEFAULT '',
  duration_minutes integer NOT NULL DEFAULT 60,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_study_tasks_plan_id ON study_tasks(plan_id);

ALTER TABLE study_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_study_tasks" ON study_tasks;
CREATE POLICY "anon_select_study_tasks" ON study_tasks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_study_tasks" ON study_tasks;
CREATE POLICY "anon_insert_study_tasks" ON study_tasks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_study_tasks" ON study_tasks;
CREATE POLICY "anon_update_study_tasks" ON study_tasks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_study_tasks" ON study_tasks;
CREATE POLICY "anon_delete_study_tasks" ON study_tasks FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS study_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  category text NOT NULL DEFAULT 'general'
);

ALTER TABLE study_tips ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_study_tips" ON study_tips;
CREATE POLICY "anon_select_study_tips" ON study_tips FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_study_tips" ON study_tips;
CREATE POLICY "anon_insert_study_tips" ON study_tips FOR INSERT
  TO anon, authenticated WITH CHECK (true);

INSERT INTO study_tips (text, category) VALUES
  ('Break your study sessions into 25-minute focused blocks followed by 5-minute breaks. The Pomodoro Technique keeps your mind fresh and engaged.', 'technique'),
  ('Teach what you''ve learned to someone else. If you can explain it simply, you truly understand it.', 'technique'),
  ('Active recall beats passive reading. Close your book and try to write down everything you remember.', 'technique'),
  ('Space out your revision over days, not hours. Spaced repetition locks knowledge into long-term memory.', 'memory'),
  ('Sleep is when your brain consolidates learning. Never sacrifice a good night''s rest before an exam.', 'wellness'),
  ('Hydrate often. Even mild dehydration reduces concentration and cognitive performance.', 'wellness'),
  ('Start with the hardest topic when your energy is highest. Tackle easy material when you feel tired.', 'strategy'),
  ('Set a specific goal for each study session. "Read chapter 3" beats "study biology" every time.', 'strategy'),
  ('Review your notes within 24 hours of class. You retain far more than if you wait until exam week.', 'memory'),
  ('Eliminate distractions. Put your phone in another room — willpower alone is not enough.', 'focus'),
  ('Reward yourself after completing a tough study session. Positive reinforcement builds lasting habits.', 'motivation'),
  ('Progress, not perfection. Consistent small efforts compound into remarkable results over time.', 'motivation'),
  ('Use practice tests under real exam conditions. Familiarity with the format reduces anxiety.', 'strategy'),
  ('Exercise boosts brain function. A 20-minute walk before studying improves focus and memory.', 'wellness'),
  ('Mix subjects in one session. Interleaving different topics improves problem-solving flexibility.', 'technique')
ON CONFLICT DO NOTHING;
