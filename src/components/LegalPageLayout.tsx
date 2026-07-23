import type { ReactNode } from 'react';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

type LegalPageLayoutProps = {
  title: string;
  icon: 'shield' | 'file';
  onBack: () => void;
  children: ReactNode;
};

export default function LegalPageLayout({ title, icon, onBack, children }: LegalPageLayoutProps) {
  const Icon = icon === 'shield' ? Shield : FileText;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 transition-colors">
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 md:p-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {today}</p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
