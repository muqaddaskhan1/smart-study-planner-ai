import { useState, useEffect, useCallback } from 'react';
import { BookOpen, CheckCircle2, Calendar, Flame, TrendingUp, ArrowRight, Clock, Sparkles, Loader2 } from 'lucide-react';
import { supabase, type StudyPlan, type StudyTask } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import type { Page } from '@/components/Navbar';
import ProgressRing from '@/components/ProgressRing';
import EmptyState from '@/components/EmptyState';

type DashboardProps = {
  onNavigate: (page: Page) => void;
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, profile } = useAuth();
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [allTasks, setAllTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data: planData } = await supabase
      .from('study_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    const planList = (planData as StudyPlan[]) || [];
    setPlans(planList);

    if (planList.length > 0) {
      const planIds = planList.map((p) => p.id);
      const { data: taskData } = await supabase
        .from('study_tasks')
        .select('*')
        .in('plan_id', planIds)
        .order('day_number', { ascending: true });
      setAllTasks((taskData as StudyTask[]) || []);
    } else {
      setAllTasks([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const completedTasks = allTasks.filter((t) => t.completed);
  const upcomingExams = plans.filter((p) => new Date(p.exam_date + 'T00:00:00') >= new Date(new Date().setHours(0, 0, 0, 0)));
  const recentPlans = plans.slice(0, 3);

  // Calculate streak: consecutive days with at least one completed task
  const completedDates = new Set(
    completedTasks.map((t) => t.task_date)
  );
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    if (completedDates.has(dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  const stats = [
    { icon: BookOpen, label: 'Total Plans', value: plans.length, color: 'blue' },
    { icon: CheckCircle2, label: 'Completed Tasks', value: completedTasks.length, color: 'green' },
    { icon: Calendar, label: 'Upcoming Exams', value: upcomingExams.length, color: 'amber' },
    { icon: Flame, label: 'Study Streak', value: `${streak} days`, color: 'orange' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 md:py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Here is an overview of your study progress.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${colorMap[stat.color]} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Study Plans</h2>
              <button
                onClick={() => onNavigate('planner')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {recentPlans.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="w-8 h-8 text-blue-400" />}
                title="No study plans yet"
                description="Create your first study plan to get started."
                action={
                  <button
                    onClick={() => onNavigate('planner')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" /> Create a Plan
                  </button>
                }
              />
            ) : (
              <div className="space-y-3">
                {recentPlans.map((plan) => {
                  const planTasks = allTasks.filter((t) => t.plan_id === plan.id);
                  const planCompleted = planTasks.filter((t) => t.completed).length;
                  const planProgress = planTasks.length > 0 ? planCompleted / planTasks.length : 0;
                  const examDate = new Date(plan.exam_date + 'T00:00:00');
                  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                  return (
                    <div
                      key={plan.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer"
                      onClick={() => onNavigate('planner')}
                    >
                      <ProgressRing progress={planProgress} size={56} strokeWidth={6} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 dark:text-white truncate">{plan.subject}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {examDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {daysLeft} days left
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> {planCompleted}/{planTasks.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Exams */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-5">Upcoming Exams</h2>
            {upcomingExams.length === 0 ? (
              <EmptyState
                icon={<Calendar className="w-8 h-8 text-blue-400" />}
                title="No upcoming exams"
                description="Your future exams will appear here."
              />
            ) : (
              <div className="space-y-3">
                {upcomingExams.slice(0, 5).map((exam) => {
                  const examDate = new Date(exam.exam_date + 'T00:00:00');
                  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                  return (
                    <div key={exam.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 leading-none">{daysLeft}</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-500 leading-none">days</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 dark:text-white text-sm truncate">{exam.subject}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {examDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
