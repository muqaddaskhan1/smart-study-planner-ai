import { useState, useEffect, useRef } from 'react';
import Navbar, { type Page } from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Home from '@/pages/Home';
import Planner from '@/pages/Planner';
import Assistant from '@/pages/Assistant';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import SettingsPage from '@/pages/Settings';
import Auth from '@/pages/Auth';
import { useTheme } from '@/lib/useTheme';
import { useAuth } from '@/lib/auth';
import { FullPageSpinner } from '@/components/Spinner';
import { supabase } from '@/lib/supabase';
import { showNotification } from '@/lib/notifications';

function App() {
  const [page, setPage] = useState<Page>('home');
  const { theme, toggleTheme } = useTheme();
  const { session, user, profile, loading, signOut } = useAuth();
  const reminderTimer = useRef<number | null>(null);

  const handleNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load reminder settings and schedule notification
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (data && (data as { notifications_enabled: boolean }).notifications_enabled) {
        const timeStr = (data as { reminder_time: string }).reminder_time;
        if (reminderTimer.current) clearTimeout(reminderTimer.current);
        const [hours, minutes] = timeStr.split(':').map(Number);
        const now = new Date();
        const reminder = new Date();
        reminder.setHours(hours, minutes, 0, 0);
        if (reminder <= now) reminder.setDate(reminder.getDate() + 1);
        const msUntil = reminder.getTime() - now.getTime();
        reminderTimer.current = window.setTimeout(() => {
          showNotification('Smart Study Planner AI', 'Time to study! Check your study plan for today\'s tasks.');
        }, msUntil);
      }
    })();
    return () => {
      if (reminderTimer.current) clearTimeout(reminderTimer.current);
    };
  }, [user]);

  if (loading) {
    return <FullPageSpinner label="Loading..." />;
  }

  // Not signed in — show auth page
  if (!session) {
    return <Auth theme={theme} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <Navbar
        currentPage={page}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSignOut={signOut}
        profileName={profile?.full_name}
      />
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={handleNavigate} />}
        {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {page === 'planner' && <Planner />}
        {page === 'assistant' && <Assistant />}
        {page === 'about' && <About onNavigate={handleNavigate} />}
        {page === 'profile' && <Profile />}
        {page === 'settings' && <SettingsPage theme={theme} onToggleTheme={toggleTheme} />}
      </main>
      <Footer onNavigate={handleNavigate} />
      <ChatWidget />
    </div>
  );
}

export default App;
