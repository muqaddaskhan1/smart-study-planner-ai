import { Brain, Calendar, CheckCircle2, TrendingUp, Sparkles, ArrowRight, Clock, Target, BookOpen, Moon } from 'lucide-react';
import type { Page } from '@/components/Navbar';

type HomeProps = {
  onNavigate: (page: Page) => void;
};

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description: 'Enter your subject, exam date, and available hours. Our AI generates a day-by-day study schedule tailored to you.',
  },
  {
    icon: CheckCircle2,
    title: 'Daily Task Checklist',
    description: 'Stay accountable with clear daily tasks. Check them off as you go and build a consistent study habit.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visual progress rings show how far you have come and how much remains before your exam.',
  },
  {
    icon: Sparkles,
    title: 'Motivational Tips',
    description: 'Curated study tips and motivational quotes keep you inspired and learning efficiently throughout your journey.',
  },
];

const steps = [
  { icon: BookOpen, title: 'Enter Your Subject', desc: 'Tell us what you are studying and when your exam is.' },
  { icon: Clock, title: 'Set Study Hours', desc: 'Choose how many hours per day you can commit.' },
  { icon: Brain, title: 'Get Your Plan', desc: 'AI generates a personalized day-by-day schedule instantly.' },
  { icon: Target, title: 'Track & Succeed', desc: 'Follow your checklist and watch your progress grow.' },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span className="text-sm font-medium text-blue-100">AI-Powered Study Planning</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Study smarter, <br className="hidden sm:block" />not harder.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl mx-auto">
              Smart Study Planner AI creates personalized study schedules based on your subjects, exam dates, and available time. Stay organized, stay motivated, and ace your exams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('planner')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-700 font-semibold shadow-lg shadow-blue-900/30 hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Create Your Plan
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('assistant')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-200"
              >
                <Brain className="w-5 h-5" />
                Try AI Assistant
              </button>
            </div>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="currentColor" className="text-slate-50 dark:text-slate-950" />
        </svg>
      </section>

      {/* Features */}
      <section className="bg-slate-50 dark:bg-slate-950 py-16 md:py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">Everything you need to ace your exams</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Powerful features designed to help university students study efficiently and stay on track.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-slate-900 py-16 md:py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">How it works</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">Four simple steps to your personalized study plan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900 hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <Calendar className="w-12 h-12 text-blue-200 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start studying?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Create your personalized study plan now and take the first step toward exam success.
          </p>
          <button
            onClick={() => onNavigate('planner')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
