import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // The editorial cream design is single-theme. Keep the provider around so
  // consumers (Navbar, etc.) don't crash, but hard-pin to 'light' and no-op
  // the setter/toggle.
  const [theme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    try {
      localStorage.setItem(STORAGE_KEYS.theme, 'light');
    } catch {}
  }, []);

  const noop = useCallback(() => {}, []);
  const value = useMemo(
    () => ({ theme, setTheme: noop, toggle: noop }),
    [theme, noop],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
