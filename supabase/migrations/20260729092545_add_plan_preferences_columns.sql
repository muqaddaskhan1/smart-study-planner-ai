/*
# Add study plan preference columns

1. Overview
   Adds optional preference columns to study_plans so the AI study plan
   generator can personalize schedules based on the student's weak
   subjects, preferred study time, and break preferences.

2. Modified Tables
   - study_plans:
     - weak_subjects (text, nullable) — comma-separated weak areas
     - preferred_study_time (text, nullable) — e.g. "Morning", "Evening"
     - break_preference (text, nullable) — e.g. "Short frequent breaks"

3. Security
   No policy changes — existing owner-scoped RLS on study_plans
   already covers the new columns.
*/

ALTER TABLE study_plans ADD COLUMN IF NOT EXISTS weak_subjects text DEFAULT '';
ALTER TABLE study_plans ADD COLUMN IF NOT EXISTS preferred_study_time text DEFAULT '';
ALTER TABLE study_plans ADD COLUMN IF NOT EXISTS break_preference text DEFAULT '';
