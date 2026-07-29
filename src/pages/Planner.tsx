import { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, BookOpen, Sparkles, Loader2, CheckCircle2, Circle, Trash2, CalendarDays, TrendingUp, RotateCcw, Quote, Lightbulb, ChevronDown, ChevronRight, Archive, Download, FileText, AlertCircle, Target, Coffee, Sunrise } from 'lucide-react';
import { supabase, type StudyPlan, type StudyTask } from '@/lib/supabase';
import { generateAIStudyPlan, isGeminiConfigured } from '@/services/gemini';
import { getRandomQuote } from '@/lib/quotes';
import { exportPlanToPDF } from '@/lib/pdfExport';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/Toast';
import ProgressRing from '@/components/ProgressRing';
import EmptyState from '@/components/EmptyState';

function getPhaseLabel(dayNumber: number, totalDays: number): string {
  const progress = totalDays > 1 ? (dayNumber - 1) / totalDays : 0.5;
  if (progress < 0.2) return 'Foundation';
  if (progress < 0.45) return 'Practice';
  if (progress < 0.7) return 'Deep Dive';
  if (progress < 0.9) return 'Review';
  return 'Assessment';
}

export default function Planner() {
  const { user } = useAuth();
  const { show } = useToast();
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState('2');
  const [weakSubjects, setWeakSubjects] = useState('');
  const [preferredStudyTime, setPreferredStudyTime] = useState('Morning');
  const [breakPreference, setBreakPreference] = useState('Short frequent breaks (Pomodoro)');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const geminiReady = isGeminiConfigured();
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [quote, setQuote] = useState('');
  const [tips, setTips] = useState<string[]>([]);
  const [oldPlans, setOldPlans] = useState<StudyPlan[]>([]);
  const [showOldPlans, setShowOldPlans] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  const loadExistingPlan = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    const { data: plans } = await supabase
      .from('study_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (plans && plans.length > 0) {
      const allPlans = plans as StudyPlan[];
      const latestPlan = allPlans[0];
      setPlan(latestPlan);
      const { data: planTasks } = await supabase
        .from('study_tasks')
        .select('*')
        .eq('plan_id', latestPlan.id)
        .order('day_number', { ascending: true });
      setTasks((planTasks as StudyTask[]) || []);
      setOldPlans(allPlans.slice(1));
      setQuote(getRandomQuote());
      setTips([]);
    } else {
      setPlan(null);
      setTasks([]);
      setOldPlans([]);
    }
    setLoadingData(false);
  }, [user]);

  useEffect(() => {
    loadExistingPlan();
  }, [loadExistingPlan]);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!subject.trim()) { setError('Please enter a subject name.'); return; }
    if (!examDate) { setError('Please select an exam date.'); return; }
    const hours = parseFloat(dailyHours);
    if (isNaN(hours) || hours <= 0 || hours > 16) { setError('Please enter a valid number of study hours (1-16).'); return; }

    const exam = new Date(examDate + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (exam <= now) { setError('Exam date must be in the future.'); return; }

    setLoading(true);
    try {
      const totalDays = Math.max(1, Math.ceil((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

      const { data: newPlan, error: planError } = await supabase
        .from('study_plans')
        .insert({
          subject: subject.trim(),
          exam_date: examDate,
          daily_hours: hours,
          total_days: totalDays,
          weak_subjects: weakSubjects.trim(),
          preferred_study_time: preferredStudyTime,
          break_preference: breakPreference,
        })
        .select()
        .single();

      if (planError || !newPlan) {
        setError('Failed to create study plan. Please try again.');
        setLoading(false);
        return;
      }

      const aiResult = await generateAIStudyPlan({
        subject: subject.trim(),
        examDate,
        dailyHours: hours,
        weakSubjects: weakSubjects.trim(),
        preferredStudyTime,
        breakPreference,
      });

      const tasksToInsert = aiResult.tasks.map((t) => ({
        plan_id: (newPlan as StudyPlan).id,
        day_number: t.day_number,
        task_date: t.task_date,
        title: t.title,
        description: t.description,
        topic: t.topic,
        duration_minutes: t.duration_minutes,
        completed: false,
      }));

      const { data: insertedTasks } = await supabase
        .from('study_tasks')
        .insert(tasksToInsert)
        .select('*')
        .order('day_number', { ascending: true });

      setPlan(newPlan as StudyPlan);
      setTasks((insertedTasks as StudyTask[]) || []);
      setQuote(getRandomQuote());
      setTips(aiResult.tips.length > 0 ? aiResult.tips : []);
      setExpandedDays(new Set());
      setSubject('');
      setExamDate('');
      setDailyHours('2');
      setWeakSubjects('');
      await loadExistingPlan();
      show('AI study plan generated successfully!', 'success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
    }
    setLoading(false);
  };

  const toggleTask = async (taskId: string, current: boolean) => {
    const { data } = await supabase
      .from('study_tasks')
      .update({ completed: !current })
      .eq('id', taskId)
      .select()
      .single();
    if (data) {
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !current } : t)));
    }
  };

  const handleResetProgress = async () => {
    if (!plan) return;
    const { error } = await supabase
      .from('study_tasks')
      .update({ completed: false })
      .eq('plan_id', plan.id);
    if (!error) {
      setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
      show('Progress has been reset.', 'success');
    } else {
      show('Failed to reset progress.', 'error');
    }
  };

  const deletePlan = async (planId: string) => {
    await supabase.from('study_plans').delete().eq('id', planId);
    if (planId === plan?.id) {
      setPlan(null);
      setTasks([]);
      setQuote('');
      setTips([]);
    }
    setOldPlans((prev) => prev.filter((p) => p.id !== planId));
    if (planId === plan?.id) {
      const { data: remaining } = await supabase
        .from('study_plans')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      if (remaining && remaining.length > 0) {
        const latest = (remaining as StudyPlan[])[0];
        setPlan(latest);
        const { data: planTasks } = await supabase
          .from('study_tasks')
          .select('*')
          .eq('plan_id', latest.id)
          .order('day_number', { ascending: true });
        setTasks((planTasks as StudyTask[]) || []);
        setOldPlans((remaining as StudyPlan[]).slice(1));
      } else {
        setOldPlans([]);
      }
    }
    show('Study plan deleted.', 'info');
  };

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const handleExportPDF = () => {
    if (plan && tasks.length > 0) {
      exportPlanToPDF(plan, tasks);
      show('Opening PDF for download...', 'success');
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;
  const todayTasks = tasks.filter((t) => t.task_date === todayStr);

  const tasksByDay = tasks.reduce<Record<number, StudyTask[]>>((acc, task) => {
    if (!acc[task.day_number]) acc[task.day_number] = [];
    acc[task.day_number].push(task);
    return acc;
  }, {});
  const dayNumbers = Object.keys(tasksByDay).map(Number).sort((a, b) => a - b);

  if (loadingData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 md:py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">Study Plan Generator</h1>
          <p className="text-slate-500 dark:text-slate-400">Enter your details and let AI build a personalized study schedule for you.</p>
        </div>

        {/* API Key Warning */}
        {!geminiReady && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-400">AI features are unavailable</p>
              <p className="text-sm text-amber-700 dark:text-amber-500 mt-0.5">
                The Google Gemini API key is not configured. Add <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-xs">VITE_GEMINI_API_KEY</code> to your environment to enable AI-powered study plan generation.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 mb-8 animate-fade-in-up">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Subject Name
                </label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Mathematics"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Exam Date
                </label>
                <input type="date" value={examDate} min={todayStr} onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Study Hours / Day
                </label>
                <input type="number" value={dailyHours} min="1" max="16" step="0.5" onChange={(e) => setDailyHours(e.target.value)} placeholder="e.g. 3"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Target className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Weak Subjects
                </label>
                <input type="text" value={weakSubjects} onChange={(e) => setWeakSubjects(e.target.value)} placeholder="e.g. Calculus, Organic Chem"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Sunrise className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Preferred Study Time
                </label>
                <select value={preferredStudyTime} onChange={(e) => setPreferredStudyTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200">
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Mixed">Mixed / Flexible</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Coffee className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Break Preference
                </label>
                <select value={breakPreference} onChange={(e) => setBreakPreference(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all text-slate-700 dark:text-slate-200">
                  <option value="Short frequent breaks (Pomodoro)">Short frequent breaks (Pomodoro)</option>
                  <option value="Longer breaks between sessions">Longer breaks between sessions</option>
                  <option value="Few short breaks">Few short breaks</option>
                  <option value="No preference">No preference</option>
                </select>
              </div>
            </div>

            {error && (
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2.5 rounded-lg">{error}</p>
              </div>
            )}
            <div>
              <button type="submit" disabled={loading || !geminiReady}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-200 dark:shadow-blue-900 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition-all duration-200">
                {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> AI is generating your plan...</>) : (<><Sparkles className="w-5 h-5" /> Generate AI Study Plan</>)}
              </button>
            </div>
          </form>
        </div>

        {/* Old Plans */}
        {oldPlans.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <button onClick={() => setShowOldPlans(!showOldPlans)}
              className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Archive className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Previous Study Plans ({oldPlans.length})
              </span>
              {showOldPlans ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {showOldPlans && (
              <div className="mt-3 space-y-2 animate-fade-in-up">
                {oldPlans.map((oldPlan) => (
                  <div key={oldPlan.id} className="flex items-center justify-between px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">{oldPlan.subject}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Exam: {new Date(oldPlan.exam_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{oldPlan.total_days} days</span>
                    </div>
                    <button onClick={() => deletePlan(oldPlan.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" title="Delete this plan">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Plan Display */}
        {plan && tasks.length > 0 && (
          <>
            {quote && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden animate-fade-in-up">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -ml-8 -mb-8" />
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-blue-100" />
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-medium leading-relaxed italic">"{quote}"</p>
                    <p className="text-sm text-blue-200 mt-3">Your motivation for today — keep going!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Plan Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 mb-8 animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">{plan.subject}</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium">{plan.total_days} days</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Your Personalized Study Plan</h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Exam: {new Date(plan.exam_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {plan.daily_hours} hrs/day</span>
                    <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {completedCount}/{tasks.length} tasks done</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ProgressRing progress={progress} size={100} label="Complete" />
                  <div className="flex flex-col gap-2">
                    <button onClick={handleExportPDF}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button onClick={handleResetProgress}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <RotateCcw className="w-4 h-4" /> Reset Progress
                    </button>
                    <button onClick={() => deletePlan(plan.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 text-sm font-medium transition-colors">
                      <Trash2 className="w-4 h-4" /> Delete Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Tasks */}
            {todayTasks.length > 0 && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 mb-8 text-white animate-fade-in-up">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="w-5 h-5 text-blue-200" />
                  <h3 className="text-lg font-semibold">Today's Tasks</h3>
                </div>
                <div className="space-y-3">
                  {todayTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors">
                      <button onClick={() => toggleTask(task.id, task.completed)} className="mt-0.5 flex-shrink-0">
                        {task.completed ? <CheckCircle2 className="w-5 h-5 text-green-300" /> : <Circle className="w-5 h-5 text-blue-200 hover:text-white transition-colors" />}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-blue-200' : ''}`}>{task.title}</p>
                        <p className="text-sm text-blue-200 mt-0.5">{task.description}</p>
                        {task.duration_minutes > 0 && <span className="text-xs text-blue-300 mt-1 inline-block">{task.duration_minutes} min</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Schedule */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 mb-8 animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Full Study Schedule</h3>
                <span className="text-sm text-slate-400 dark:text-slate-500">{completedCount} of {tasks.length} completed</span>
              </div>
              <div className="space-y-3">
                {dayNumbers.map((dayNum) => {
                  const dayTasks = tasksByDay[dayNum];
                  const dayCompleted = dayTasks.filter((t) => t.completed).length;
                  const isExpanded = expandedDays.has(dayNum);
                  const firstTask = dayTasks[0];
                  const isPast = firstTask.task_date < todayStr;
                  const isToday = firstTask.task_date === todayStr;
                  return (
                    <div key={dayNum} className={`rounded-xl border transition-all ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800'}`}>
                      <button onClick={() => toggleDay(dayNum)} className="w-full flex items-center gap-3 p-4 text-left">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${dayCompleted === dayTasks.length ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : isToday ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          {dayCompleted === dayTasks.length ? <CheckCircle2 className="w-5 h-5" /> : dayNum}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-slate-800 dark:text-slate-200">Day {dayNum}</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">{new Date(firstTask.task_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                            {isToday && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-medium">Today</span>}
                            {isPast && !isToday && dayCompleted < dayTasks.length && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">Missed</span>}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">{getPhaseLabel(dayNum, plan.total_days)}</span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{dayCompleted}/{dayTasks.length} tasks • {dayTasks[0].topic}{dayTasks.length > 1 && ` +${dayTasks.length - 1} more`}</p>
                        </div>
                        {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-2 animate-fade-in">
                          {dayTasks.map((task) => (
                            <div key={task.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${task.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                              <button onClick={() => toggleTask(task.id, task.completed)} className="mt-0.5 flex-shrink-0">
                                {task.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-blue-500 transition-colors" />}
                              </button>
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-slate-800 dark:text-slate-200 ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>{task.title}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{task.description}</p>
                              </div>
                              {task.duration_minutes > 0 && <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 flex-shrink-0"><Clock className="w-3 h-3" />{task.duration_minutes}m</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {completedCount === tasks.length && tasks.length > 0 && (
                <div className="mt-6 text-center py-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold text-green-700 dark:text-green-400">All tasks completed! You are ready for your exam.</p>
                </div>
              )}
            </div>

            {/* Study Tips */}
            {tips.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Study Tips for Success</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-800 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!plan && !loadingData && (
          <EmptyState
            icon={<FileText className="w-8 h-8 text-blue-400" />}
            title="No study plan yet"
            description="Fill out the form above to generate your personalized AI study plan."
          />
        )}
      </div>
    </div>
  );
}
