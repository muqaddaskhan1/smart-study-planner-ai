import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, type Profile, type UserSettings } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  settings: UserSettings | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshSettings: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (!error && data) {
      setProfile(data as Profile);
    } else if (!data) {
      const { data: newProfile } = await supabase
        .from('profiles')
        .insert({ id: userId, full_name: '' })
        .select('*')
        .maybeSingle();
      if (newProfile) setProfile(newProfile as Profile);
    }
  }, []);

  const loadSettings = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (!error && data) {
      setSettings(data as UserSettings);
    } else if (!data) {
      const { data: newSettings } = await supabase
        .from('user_settings')
        .insert({ user_id: userId })
        .select('*')
        .maybeSingle();
      if (newSettings) setSettings(newSettings as UserSettings);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id);
  }, [user, loadProfile]);

  const refreshSettings = useCallback(async () => {
    if (user) await loadSettings(user.id);
  }, [user, loadSettings]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        Promise.all([loadProfile(session.user.id), loadSettings(session.user.id)]).finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        (async () => {
          await Promise.all([loadProfile(session.user.id), loadSettings(session.user.id)]);
        })();
      } else {
        setProfile(null);
        setSettings(null);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [loadProfile, loadSettings]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, full_name: fullName });
      await supabase.from('user_settings').insert({ user_id: data.user.id });
    }
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setSettings(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user, profile, settings, loading, signUp, signIn, signOut, refreshProfile, refreshSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
