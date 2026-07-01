import { forwardRef } from 'react';
import { cn } from '../utils/cn';

export const Input = forwardRef(function Input(
  { className, leftIcon, rightSlot, invalid, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        'group flex h-9 items-center gap-2 rounded-[var(--radius)] border bg-[color:var(--color-surface)] px-3 transition-colors',
        invalid
          ? 'border-[color:var(--color-danger)]'
          : 'border-[color:var(--color-border)] focus-within:border-[color:var(--color-accent)]',
      )}
    >
      {leftIcon && (
        <span className="shrink-0 text-[color:var(--color-text-subtle)]">{leftIcon}</span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full flex-1 border-0 bg-transparent text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none',
          className,
        )}
        {...rest}
      />
      {rightSlot}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, invalid, rows = 4, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full rounded-[var(--radius)] border bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none focus:border-[color:var(--color-accent)]',
        invalid ? 'border-[color:var(--color-danger)]' : 'border-[color:var(--color-border)]',
        className,
      )}
      {...rest}
    />
  );
});

export const Select = forwardRef(function Select(
  { className, invalid, children, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        'h-9 w-full appearance-none rounded-[var(--radius)] border bg-[color:var(--color-surface)] pl-3 pr-8 text-sm text-[color:var(--color-text)] focus:outline-none focus:border-[color:var(--color-accent)]',
        invalid ? 'border-[color:var(--color-danger)]' : 'border-[color:var(--color-border)]',
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M3 4.5L6 7.5 9 4.5'/></svg>\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        backgroundSize: '12px',
      }}
      {...rest}
    >
      {children}
    </select>
  );
});

export function Field({ label, error, hint, htmlFor, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-medium text-[color:var(--color-text)]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[color:var(--color-danger)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-[12.5px] text-[color:var(--color-danger)]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12.5px] text-[color:var(--color-text-subtle)]">{hint}</p>
      ) : null}
    </div>
  );
}
