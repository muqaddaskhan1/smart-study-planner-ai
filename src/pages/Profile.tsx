import { useState } from 'react';
import { User, Mail, Camera, Save, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/Toast';
import { supabase } from '@/lib/supabase';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { show } = useToast();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    setSaving(false);
    if (error) {
      show('Failed to update profile. Please try again.', 'error');
    } else {
      await refreshProfile();
      show('Profile updated successfully!', 'success');
    }
  };

  const initials = (profile?.full_name || user?.email || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 md:py-12 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">Your Profile</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your personal information.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 animate-fade-in-up">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-blue-100 dark:border-blue-900">
                  {initials}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white dark:border-slate-900">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <User className="w-4 h-4 text-blue-500" /> Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Mail className="w-4 h-4 text-blue-500" /> Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Email cannot be changed.</p>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Camera className="w-4 h-4 text-blue-500" /> Avatar URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200"
              />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Paste a link to your profile picture.</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900 hover:shadow-lg disabled:opacity-60 transition-all"
            >
              {saving ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-5 h-5" /> Save Changes</>
              )}
            </button>
          </form>

          {profile && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Check className="w-4 h-4 text-green-500" />
                <span>Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
