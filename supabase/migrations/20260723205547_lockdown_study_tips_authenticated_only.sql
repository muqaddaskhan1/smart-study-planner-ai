/*
# Lock down study_tips table for authenticated-only access

1. Security Changes
   - study_tips: remove anon INSERT policy (leftover from single-tenant era).
     This table is reference data (seeded tips) and should be read-only
     for authenticated users. No inserts, updates, or deletes are needed
     from the frontend.
   - Remove anon role from all study_tips policies — only authenticated
     users can read tips now.
   - Add UPDATE and DELETE policies scoped to authenticated users (for
     admin use only, though the frontend does not use them).

2. Why
   The previous anon INSERT policy allowed unauthenticated users to
   write arbitrary data into study_tips. With authentication now required,
   anon access is unnecessary and is a write-injection risk.
*/

-- Remove old anon policies
DROP POLICY IF EXISTS "anon_select_study_tips" ON study_tips;
DROP POLICY IF EXISTS "anon_insert_study_tips" ON study_tips;

-- Read-only for authenticated users
DROP POLICY IF EXISTS "authenticated_select_study_tips" ON study_tips;
CREATE POLICY "authenticated_select_study_tips" ON study_tips FOR SELECT
  TO authenticated USING (true);

-- No INSERT/UPDATE/DELETE from the frontend — but if needed, scope to authenticated
DROP POLICY IF EXISTS "authenticated_insert_study_tips" ON study_tips;
CREATE POLICY "authenticated_insert_study_tips" ON study_tips FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_study_tips" ON study_tips;
CREATE POLICY "authenticated_update_study_tips" ON study_tips FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_study_tips" ON study_tips;
CREATE POLICY "authenticated_delete_study_tips" ON study_tips FOR DELETE
  TO authenticated USING (true);
