import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export function TagInput({
  values = [],
  onChange,
  placeholder = 'Type and press Enter',
  invalid,
  id,
}) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  const add = (raw) => {
    const trimmed = String(raw).trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) {
      setDraft('');
      return;
    }
    onChange([...values, trimmed]);
    setDraft('');
  };

  const remove = (idx) => onChange(values.filter((_, i) => i !== idx));

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(draft);
    } else if (e.key === 'Backspace' && !draft && values.length) {
      e.preventDefault();
      remove(values.length - 1);
    }
  };

  const onPaste = (e) => {
    const text = e.clipboardData.getData('text');
    if (!text.includes(',')) return;
    e.preventDefault();
    text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach(add);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'flex min-h-9 flex-wrap items-center gap-1.5 rounded-[var(--radius)] border bg-[color:var(--color-surface)] px-2 py-1.5 focus-within:border-[color:var(--color-accent)]',
        invalid ? 'border-[color:var(--color-danger)]' : 'border-[color:var(--color-border)]',
      )}
    >
      {values.map((v, i) => (
        <span
          key={`${v}-${i}`}
          className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-accent-soft)] px-2 py-0.5 text-[12px] font-medium text-[color:var(--color-accent-text)]"
        >
          {v}
          <button
            type="button"
            aria-label={`Remove ${v}`}
            onClick={(e) => {
              e.stopPropagation();
              remove(i);
            }}
            className="rounded-full p-0.5 hover:bg-black/5"
          >
            <X size={10} aria-hidden="true" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => add(draft)}
        onPaste={onPaste}
        placeholder={values.length ? '' : placeholder}
        className="min-w-[120px] flex-1 border-0 bg-transparent text-[13.5px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
      />
    </div>
  );
}
