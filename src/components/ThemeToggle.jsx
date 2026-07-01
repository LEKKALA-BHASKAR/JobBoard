import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-border-strong)] hover:text-[color:var(--color-text)]"
    >
      {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  );
}
