import { cn } from '../utils/cn';

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-6 py-14 text-center',
        className,
      )}
    >
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-surface-3)] text-[color:var(--color-text-muted)]">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-[15px] font-semibold text-[color:var(--color-text)]">{title}</h3>
        {description && (
          <p className="mx-auto mt-1 max-w-sm text-[13.5px] leading-relaxed text-[color:var(--color-text-muted)]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
