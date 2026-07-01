import { Plus, X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/cn';

// Ordered list of freeform strings — used for responsibilities/requirements/benefits.
export function BulletInput({ values = [], onChange, placeholder, invalid, id }) {
  const update = (idx, value) => {
    const next = [...values];
    next[idx] = value;
    onChange(next);
  };
  const remove = (idx) => onChange(values.filter((_, i) => i !== idx));
  const add = () => onChange([...values, '']);

  return (
    <div className={cn('flex flex-col gap-2', invalid && 'ring-1 ring-[color:var(--color-danger)] rounded-[var(--radius)] p-2')}>
      {values.length === 0 && (
        <p className="text-[12.5px] text-[color:var(--color-text-subtle)]">No items yet.</p>
      )}
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="ml-1 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-border-strong)]"
          />
          <input
            id={i === 0 ? id : undefined}
            value={v}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className="h-9 flex-1 rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 text-[13.5px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none focus:border-[color:var(--color-accent)]"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label="Remove item"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[color:var(--color-text-subtle)] hover:bg-[color:var(--color-surface-3)] hover:text-[color:var(--color-text)]"
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={add}
        leftIcon={<Plus size={12} aria-hidden="true" />}
        className="self-start"
      >
        Add item
      </Button>
    </div>
  );
}
