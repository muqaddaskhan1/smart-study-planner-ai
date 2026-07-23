import { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, RefreshCw, MessageCircle, Brain } from 'lucide-react';
import { supabase, type StudyTip } from '@/lib/supabase';

export default function Assistant() {
  const [tips, setTips] = useState<StudyTip[]>([]);
  const [tipIndex, setTipIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('study_tips').select('*');
      if (data && data.length > 0) {
        const shuffled = [...(data as StudyTip[])].sort(() => Math.random() - 0.5);
        setTips(shuffled);
      }
      setLoading(false);
    })();
  }, []);

  const cycleTip = () => {
    setTipIndex((prev) => (prev + 1) % Math.max(1, tips.length));
  };

  const currentTip = tips[tipIndex];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 md:py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI-Powered</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">AI Study Assistant</h1>
          <p className="text-slate-500 dark:text-slate-400">Get instant advice on study techniques, motivation, time management, and more.</p>
        </div>

        {/* Chat hint */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Chat with AI Assistant</h2>
              <p className="text-blue-100 leading-relaxed">
                Click the floating chat button in the bottom-right corner to start a conversation. Ask about study techniques, memorization, time management, exam anxiety, and more.
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <MessageCircle className="w-5 h-5" />
              <span>Look for the chat bubble</span>
            </div>
          </div>
        </div>

        {/* Motivational Tips */}
        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Motivational Tips</h3>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Motivational Tips</h3>
              </div>
              <button onClick={cycleTip} className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors" title="Next tip">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {currentTip && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800 mb-4 animate-fade-in-up">
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{currentTip.text}</p>
                <span className="text-xs text-amber-600 dark:text-amber-400 mt-2 inline-block capitalize">{currentTip.category}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tips.slice(0, 6).map((tip, i) => (
                <div key={tip.id} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-800 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
