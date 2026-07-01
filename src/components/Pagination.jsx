import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

function pageWindow(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < sorted.length; i += 1) {
    out.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) out.push('…');
  }
  return out;
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const items = pageWindow(page, totalPages);
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] transition hover:bg-[color:var(--color-surface-3)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={14} aria-hidden="true" />
      </button>

      {items.map((p, idx) =>
        p === '…' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-1 text-[13px] text-[color:var(--color-text-subtle)]"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--radius-sm)] border px-2 text-[13px] font-medium transition',
              p === page
                ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
                : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-3)]',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] transition hover:bg-[color:var(--color-surface-3)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={14} aria-hidden="true" />
      </button>
    </nav>
  );
}
