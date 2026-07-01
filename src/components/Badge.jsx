import { cn } from '../utils/cn';

const VARIANTS = {
  neutral:
    'border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] text-[color:var(--color-text-muted)]',
  accent:
    'border-transparent bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]',
  success:
    'border-transparent bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  warning:
    'border-transparent bg-[color:var(--color-warning-soft)] text-[color:var(--color-warning)]',
  outline:
    'border-[color:var(--color-border)] bg-transparent text-[color:var(--color-text-muted)]',
};

export function Badge({ variant = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11.5px] font-medium leading-none',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
