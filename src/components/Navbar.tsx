import { useState } from 'react';
import { Brain, Menu, X, Moon, Sun, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';

type Page = 'home' | 'planner' | 'assistant' | 'about' | 'dashboard' | 'profile' | 'settings';

type NavbarProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSignOut: () => void;
  profileName?: string;
};

const navItems: { key: Page; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'planner', label: 'Planner' },
  { key: 'assistant', label: 'AI Assistant' },
  { key: 'about', label: 'About' },
];

export default function Navbar({ currentPage, onNavigate, theme, onToggleTheme, onSignOut, profileName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const initials = (profileName || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-blue-100 dark:border-slate-700 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNav('home')} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200 dark:shadow-blue-900 group-hover:shadow-blue-300 dark:group-hover:shadow-blue-700 transition-shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
              Smart Study <span className="text-blue-600 dark:text-blue-400">Planner AI</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.key
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onToggleTheme}
              className="ml-2 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Profile menu */}
            <div className="ml-2 flex items-center gap-1">
              <button
                onClick={() => handleNav('profile')}
                className={`p-1.5 rounded-lg transition-colors ${currentPage === 'profile' ? 'bg-blue-50 dark:bg-blue-900/40' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                title="Profile"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
              </button>
              <button
                onClick={() => handleNav('settings')}
                className={`p-2 rounded-lg text-slate-600 dark:text-slate-300 transition-colors ${currentPage === 'settings' ? 'bg-blue-50 dark:bg-blue-900/40' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={onSignOut}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-3 space-y-1 border-t border-blue-100 dark:border-slate-700 pt-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2 space-y-1">
              <button
                onClick={() => handleNav('profile')}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="w-4 h-4" /> Profile
              </button>
              <button
                onClick={() => handleNav('settings')}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button
                onClick={onSignOut}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export type { Page };
