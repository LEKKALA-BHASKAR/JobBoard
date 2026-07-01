import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  initialFocusRef,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
      }
      if (e.key === 'Tab') {
        // Focus trap: cycle within the dialog.
        const focusables = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => {
      (initialFocusRef?.current || dialogRef.current)?.focus();
    }, 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose, initialFocusRef]);

  const widths = {
    sm: 'max-w-[420px]',
    md: 'max-w-[520px]',
    lg: 'max-w-[640px]',
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              'relative w-full rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[var(--shadow-elev-3)]',
              widths[size],
            )}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-5">
              <div className="flex-1">
                {title && (
                  <h2 className="text-[15px] font-semibold text-[color:var(--color-text)]">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[color:var(--color-text-muted)]">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1 text-[color:var(--color-text-subtle)] hover:bg-[color:var(--color-surface-3)] hover:text-[color:var(--color-text)]"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="px-5 pb-3">{children}</div>
            {footer && (
              <div className="flex justify-end gap-2 border-t border-[color:var(--color-border)] px-5 py-3">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
