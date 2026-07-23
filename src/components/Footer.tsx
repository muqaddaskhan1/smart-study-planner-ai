import { Brain, Heart } from 'lucide-react';

type FooterProps = {
  onNavigate: (page: 'home' | 'planner' | 'assistant' | 'about' | 'dashboard' | 'profile' | 'settings') => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Smart Study Planner AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your intelligent companion for exam preparation. Personalized study plans, daily tasks, and motivation — all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-blue-400 transition-colors">Dashboard</button></li>
              <li><button onClick={() => onNavigate('planner')} className="hover:text-blue-400 transition-colors">Planner</button></li>
              <li><button onClick={() => onNavigate('assistant')} className="hover:text-blue-400 transition-colors">AI Assistant</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">About</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Developer</h4>
            <p className="text-sm text-slate-400">
              Designed & developed by
            </p>
            <p className="text-lg font-bold text-white mt-1">Muqaddas</p>
            <p className="text-sm text-slate-500 mt-1">Built with React, Tailwind CSS & Supabase</p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Smart Study Planner AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" /> by Muqaddas
          </p>
        </div>
      </div>
    </footer>
  );
}
