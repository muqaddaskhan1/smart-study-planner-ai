import { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Clock, Trash2, AlertTriangle, Loader2, UserX, Database } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/Toast';
import { supabase } from '@/lib/supabase';
import { requestNotificationPermission, showNotification } from '@/lib/notifications';

type SettingsProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export default function Settings({ theme, onToggleTheme }: SettingsProps) {
  const { user, settings, refreshSettings, signOut } = useAuth();
  const { show } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings?.notifications_enabled ?? true);
  const [reminderTime, setReminderTime] = useState(settings?.reminder_time ?? '18:00');
  const [saving, setSaving] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (settings) {
      setNotificationsEnabled(settings.notifications_enabled);
      setReminderTime(settings.reminder_time);
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('user_settings')
      .update({
        notifications_enabled: notificationsEnabled,
        reminder_time: reminderTime,
        theme,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);
    setSaving(false);
    if (error) {
      show('Failed to save settings.', 'error');
    } else {
      await refreshSettings();
      show('Settings saved successfully!', 'success');
    }
  };

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      showNotification('Smart Study Planner AI', 'Notifications are enabled! You will receive daily study reminders.');
      show('Notifications enabled!', 'success');
    } else {
      show('Notification permission denied. Please enable in browser settings.', 'error');
    }
  };

  const handleClearHistory = async () => {
    if (!user) return;
    setDeleting(true);
    const { data: plans } = await supabase.from('study_plans').select('id').eq('user_id', user.id);
    if (plans && plans.length > 0) {
      await supabase.from('study_plans').delete().in('id', (plans as { id: string }[]).map((p) => p.id));
    }
    setDeleting(false);
    setConfirmClearHistory(false);
    show('Study history cleared.', 'success');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleting(true);
    await supabase.from('study_plans').delete().eq('user_id', user.id);
    await supabase.from('profiles').delete().eq('id', user.id);
    await supabase.from('user_settings').delete().eq('user_id', user.id);
    await supabase.auth.signOut();
    setDeleting(false);
    show('Account deleted.', 'info');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 md:py-12 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Customize your experience.</p>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            {theme === 'light' ? <Moon className="w-5 h-5 text-blue-500" /> : <Sun className="w-5 h-5 text-blue-400" />}
            Appearance
          </h2>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark themes</p>
            </div>
            <button
              onClick={onToggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-amber-500" />}
              </span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-500" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-200">Daily Study Reminder</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Get a notification before your study time</p>
              </div>
              <button
                onClick={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  if (!notificationsEnabled) handleEnableNotifications();
                }}
                className={`relative w-14 h-7 rounded-full transition-colors ${notificationsEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notificationsEnabled ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-200">Reminder Time</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">When to send your daily reminder</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200 text-sm"
                />
              </div>
            </div>
            <button
              onClick={handleEnableNotifications}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Test notification
            </button>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Save Settings
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/50 p-6 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <div className="space-y-4">
            {/* Clear History */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-200">Clear Study History</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Delete all your study plans and tasks</p>
              </div>
              {confirmClearHistory ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmClearHistory(false)}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearHistory}
                    disabled={deleting}
                    className="px-3 py-1.5 rounded-lg text-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 transition-colors inline-flex items-center gap-1.5"
                  >
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
                    Confirm
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClearHistory(true)}
                  className="px-4 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Clear
                </button>
              )}
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-200">Delete Account</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete your account and all data</p>
              </div>
              {confirmDeleteAccount ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDeleteAccount(false)}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="px-3 py-1.5 rounded-lg text-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 transition-colors inline-flex items-center gap-1.5"
                  >
                    {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserX className="w-3.5 h-3.5" />}
                    Delete Forever
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDeleteAccount(true)}
                  className="px-4 py-2 rounded-lg text-sm text-white bg-red-600 hover:bg-red-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <UserX className="w-4 h-4" /> Delete Account
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div className="mt-6 text-center">
          <button
            onClick={signOut}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
