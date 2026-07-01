import { forwardRef } from 'react';
import { cn } from '../utils/cn';

const VARIANTS = {
  primary:
    'bg-[color:var(--color-accent)] text-white hover:bg-[color:var(--color-accent-hover)] shadow-[var(--shadow-elev-1)]',
  secondary:
    'bg-[color:var(--color-surface)] text-[color:var(--color-text)] border border-[color:var(--color-border)] hover:bg-[color:var(--color-surface-2)]',
  ghost:
    'bg-transparent text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-3)]',
  danger:
    'bg-[color:var(--color-danger)] text-white hover:opacity-90 shadow-[var(--shadow-elev-1)]',
  dangerGhost:
    'bg-transparent text-[color:var(--color-danger)] hover:bg-[color:var(--color-danger-soft)]',
};

const SIZES = {
  sm: 'h-8 px-3 text-[13px] rounded-[var(--radius-sm)] gap-1.5',
  md: 'h-9 px-3.5 text-sm rounded-[var(--radius)] gap-2',
  lg: 'h-11 px-5 text-[15px] rounded-[var(--radius-md)] gap-2',
};

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    disabled,
    loading,
    leftIcon,
    rightIcon,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
