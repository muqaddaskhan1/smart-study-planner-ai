import { Loader2 } from 'lucide-react';

export function Spinner({ size = 'md', label }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={`${sizeClass} text-blue-500 animate-spin`} />
      {label && <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>}
    </div>
  );
}

export function FullPageSpinner({ label }: { label?: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" label={label} />
    </div>
  );
}
