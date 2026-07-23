import { useState } from 'react';
import { Brain, Mail, Lock, User, Loader2, ArrowRight, Sparkles, Shield, FileText } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

type AuthPageProps = {
  theme: 'light' | 'dark';
};

type LegalView = 'privacy' | 'terms' | null;

export default function Auth({ theme: _theme }: AuthPageProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [legalView, setLegalView] = useState<LegalView>(null);

  if (legalView === 'privacy') {
    return <PrivacyPolicy onBack={() => setLegalView(null)} />;
  }
  if (legalView === 'terms') {
    return <TermsOfService onBack={() => setLegalView(null)} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && !fullName.trim()) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error === 'Invalid login credentials' ? 'Incorrect email or password.' : error);
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4 transition-colors">
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-200 dark:shadow-blue-900">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              Smart Study <span className="text-blue-600 dark:text-blue-400">Planner AI</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'login' ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
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
            )}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Mail className="w-4 h-4 text-blue-500" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Lock className="w-4 h-4 text-blue-500" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2.5 rounded-lg animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center gap-2 justify-center text-xs text-slate-400 dark:text-slate-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your study plans are saved securely to your account</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-blue-100 mt-4">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="font-semibold text-white underline hover:text-blue-200 transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-blue-200">
          <button
            onClick={() => setLegalView('privacy')}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
          <span className="text-blue-400">·</span>
          <button
            onClick={() => setLegalView('terms')}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
}
