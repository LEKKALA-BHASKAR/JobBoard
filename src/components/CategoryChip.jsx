import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

export function CategoryChip({ category, count, active, to }) {
  const chipInner = (
    <>
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: category.accent }}
      />
      <span className="truncate">{category.label}</span>
      {typeof count === 'number' && (
        <span className="ml-auto text-[11.5px] text-[color:var(--color-text-subtle)]">
          {count}
        </span>
      )}
    </>
  );

  const className = cn(
    'inline-flex w-full items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-[13.5px] font-medium transition-colors',
    active
      ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
      : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] hover:border-[color:var(--color-border-strong)]',
  );

  return to ? (
    <Link to={to} className={className}>
      {chipInner}
    </Link>
  ) : (
    <div className={className}>{chipInner}</div>
  );
}
