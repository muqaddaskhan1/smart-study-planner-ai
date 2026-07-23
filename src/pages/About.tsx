import { Brain, Target, Calendar, CheckCircle2, TrendingUp, Sparkles, BookOpen, Clock, Zap, Heart, Code, Moon } from 'lucide-react';
import type { Page } from '@/components/Navbar';

type AboutProps = {
  onNavigate: (page: Page) => void;
};

const features = [
  { icon: Brain, title: 'AI-Powered Planning', desc: 'Generates personalized study schedules based on your subject, exam date, and available time.' },
  { icon: CheckCircle2, title: 'Daily Task Checklist', desc: 'Stay accountable with clear daily tasks you can check off as you complete them.' },
  { icon: TrendingUp, title: 'Progress Tracker', desc: 'Visual progress rings show your completion rate and keep you motivated.' },
  { icon: Sparkles, title: 'Motivational Tips', desc: 'Curated study tips and an AI assistant to answer your study-related questions.' },
  { icon: Calendar, title: 'Smart Scheduling', desc: 'Automatically includes rest days and phases your learning from foundation to assessment.' },
  { icon: Clock, title: 'Time Management', desc: 'Allocates your daily study hours efficiently across topics and practice sessions.' },
];

const tech = [
  { icon: Code, name: 'React', desc: 'Component-based UI framework' },
  { icon: Zap, name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { icon: BookOpen, name: 'Supabase', desc: 'Database & backend' },
  { icon: Sparkles, name: 'Lucide Icons', desc: 'Clean icon system' },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Smart Study Planner AI</h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            An intelligent study planning tool designed to help university students organize their exam preparation efficiently and stay motivated throughout their journey.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Studying for university exams can be overwhelming. Many students struggle with time management, procrastination, and knowing where to focus their efforts. Smart Study Planner AI was built to solve these problems.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              By simply entering your subject, exam date, and available study hours, the app generates a complete day-by-day study plan. It phases your learning from foundational review to full mock exams, includes rest days, and tracks your progress every step of the way. Combined with an AI assistant that answers your study questions and motivational tips to keep you going, it is everything you need to ace your exams.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">Key Features</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">Everything designed to help you study smarter.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3">Built With</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">Modern technologies for a smooth experience.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tech.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center border border-slate-100 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <t.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{t.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 dark:shadow-blue-900 hover:scale-110 transition-transform duration-300">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">Meet the Developer</h2>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Muqaddas</p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mb-8">
            Passionate about building tools that make students' lives easier. Smart Study Planner AI was created to help university students stay organized, motivated, and confident as they prepare for their exams.
          </p>
          <button
            onClick={() => onNavigate('planner')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Try the Planner
          </button>
        </div>
      </section>
    </div>
  );
}
