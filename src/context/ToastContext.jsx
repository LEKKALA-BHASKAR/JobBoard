import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';
import { cn } from '../utils/cn';

const ToastContext = createContext(null);

const VARIANT_ICON = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const VARIANT_CLASSES = {
  success:
    'border-[color:var(--color-success)]/30 bg-[color:var(--color-success-soft)] text-[color:var(--color-text)]',
  error:
    'border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-soft)] text-[color:var(--color-text)]',
  info: 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, options = {}) => {
      const id = ++idRef.current;
      const variant = options.variant || 'info';
      const duration = options.duration ?? 3500;
      setToasts((t) => [...t, { id, message, variant, title: options.title }]);
      if (duration > 0) {
        setTimeout(() => remove(id), duration);
      }
      return id;
    },
    [remove],
  );

  const api = useMemo(
    () => ({
      push,
      success: (msg, opts) => push(msg, { ...opts, variant: 'success' }),
      error: (msg, opts) => push(msg, { ...opts, variant: 'error' }),
      info: (msg, opts) => push(msg, { ...opts, variant: 'info' }),
      dismiss: remove,
    }),
    [push, remove],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = VARIANT_ICON[t.variant] ?? Info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                className={cn(
                  'pointer-events-auto flex items-start gap-3 rounded-[var(--radius-md)] border px-3.5 py-3 shadow-[var(--shadow-elev-3)] backdrop-blur',
                  VARIANT_CLASSES[t.variant],
                )}
              >
                <Icon
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 shrink-0',
                    t.variant === 'success' && 'text-[color:var(--color-success)]',
                    t.variant === 'error' && 'text-[color:var(--color-danger)]',
                    t.variant === 'info' && 'text-[color:var(--color-text-muted)]',
                  )}
                />
                <div className="flex-1 text-sm leading-snug">
                  {t.title && <div className="font-medium">{t.title}</div>}
                  <div className={t.title ? 'text-[color:var(--color-text-muted)]' : ''}>
                    {t.message}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  aria-label="Dismiss notification"
                  className="rounded-md p-1 text-[color:var(--color-text-subtle)] transition hover:text-[color:var(--color-text)] focus:outline-none"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
