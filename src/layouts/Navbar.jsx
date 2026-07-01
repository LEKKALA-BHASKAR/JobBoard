import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bookmark, Menu, Plus, Search, X, Briefcase } from 'lucide-react';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { cn } from '../utils/cn';

const NAV = [
  { to: '/jobs', label: 'Browse jobs' },
  { to: '/bookmarks', label: 'Bookmarks' },
  { to: '/my-jobs', label: 'My posts' },
];

export function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    setMobileOpen(false);
    navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : '/jobs');
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-canvas)]/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Postline home">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[13.5px] font-medium transition-colors',
                  isActive
                    ? 'text-[color:var(--color-text)]'
                    : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden max-w-[280px] flex-1 md:block">
          <label htmlFor="nav-search" className="sr-only">
            Search jobs
          </label>
          <div className="flex h-9 items-center gap-2 rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 focus-within:border-[color:var(--color-accent)]">
            <Search size={14} aria-hidden="true" className="text-[color:var(--color-text-subtle)]" />
            <input
              id="nav-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, company, skill…"
              className="w-full border-0 bg-transparent text-[13.5px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <Link
            to="/post-job"
            className="hidden h-9 items-center gap-2 rounded-[var(--radius)] bg-[color:var(--color-accent)] px-3 text-[13.5px] font-medium text-white transition hover:bg-[color:var(--color-accent-hover)] sm:inline-flex"
          >
            <Plus size={14} aria-hidden="true" />
            Post a job
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] md:hidden"
          >
            {mobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 md:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <label htmlFor="nav-search-mobile" className="sr-only">
              Search jobs
            </label>
            <div className="flex h-10 items-center gap-2 rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-3">
              <Search size={14} aria-hidden="true" className="text-[color:var(--color-text-subtle)]" />
              <input
                id="nav-search-mobile"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs…"
                className="w-full border-0 bg-transparent text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
              />
            </div>
          </form>
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-[color:var(--color-surface-3)] text-[color:var(--color-text)]'
                        : 'text-[color:var(--color-text-muted)]',
                    )
                  }
                >
                  {item.to === '/bookmarks' ? (
                    <Bookmark size={14} aria-hidden="true" />
                  ) : item.to === '/my-jobs' ? (
                    <Briefcase size={14} aria-hidden="true" />
                  ) : (
                    <Search size={14} aria-hidden="true" />
                  )}
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/post-job"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] bg-[color:var(--color-accent)] text-sm font-medium text-white"
              >
                <Plus size={14} aria-hidden="true" />
                Post a job
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
