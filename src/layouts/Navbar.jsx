import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Briefcase,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { LogoAvatar } from '../components/LogoAvatar';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';

const NAV = [
  { to: '/jobs', label: 'Browse jobs' },
  { to: '/bookmarks', label: 'Bookmarks' },
  { to: '/my-jobs', label: 'My posts' },
];

export function Navbar() {
  const navigate = useNavigate();
  const { currentUser, isAdmin, signOut } = useAuth();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    setMobileOpen(false);
    navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : '/jobs');
    setQuery('');
  };

  const doSignOut = () => {
    signOut();
    setMenuOpen(false);
    setMobileOpen(false);
    toast.info('Signed out.');
    navigate('/');
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

          {currentUser ? (
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex h-9 items-center gap-2 rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] pl-1 pr-2 text-[13px] font-medium text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-2)]"
              >
                <LogoAvatar name={currentUser.name} size={26} rounded="full" />
                <span className="max-w-[110px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown size={12} aria-hidden="true" />
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-1.5 w-56 overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[var(--shadow-elev-3)]"
                >
                  <div className="border-b border-[color:var(--color-border)] px-3 py-2.5">
                    <div className="truncate text-[13px] font-medium text-[color:var(--color-text)]">
                      {currentUser.name}
                    </div>
                    <div className="truncate text-[12px] text-[color:var(--color-text-subtle)]">
                      {currentUser.email}
                    </div>
                  </div>
                  <MenuItem to="/my-jobs" onSelect={() => setMenuOpen(false)}>
                    <Briefcase size={14} aria-hidden="true" />
                    My posts
                  </MenuItem>
                  <MenuItem to="/bookmarks" onSelect={() => setMenuOpen(false)}>
                    <Bookmark size={14} aria-hidden="true" />
                    Bookmarks
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem to="/admin" onSelect={() => setMenuOpen(false)}>
                      <ShieldCheck
                        size={14}
                        aria-hidden="true"
                        className="text-[color:var(--color-accent)]"
                      />
                      Admin panel
                    </MenuItem>
                  )}
                  <button
                    role="menuitem"
                    type="button"
                    onClick={doSignOut}
                    className="flex w-full items-center gap-2 border-t border-[color:var(--color-border)] px-3 py-2 text-left text-[13px] text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-2)]"
                  >
                    <LogOut size={14} aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/signin"
                className="inline-flex h-9 items-center rounded-[var(--radius)] px-2.5 text-[13.5px] font-medium text-[color:var(--color-secondary)] transition hover:text-[color:var(--color-secondary-hover)]"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-9 items-center rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 text-[13.5px] font-medium text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-2)]"
              >
                Sign up
              </Link>
            </div>
          )}

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
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-sm font-medium text-[color:var(--color-accent-text)]"
                >
                  <ShieldCheck size={14} aria-hidden="true" />
                  Admin panel
                </NavLink>
              </li>
            )}
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

            {currentUser ? (
              <li className="mt-2 flex items-center justify-between rounded-[var(--radius)] border border-[color:var(--color-border)] px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <LogoAvatar name={currentUser.name} size={28} rounded="full" />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-[color:var(--color-text)]">
                      {currentUser.name}
                    </div>
                    <div className="truncate text-[11.5px] text-[color:var(--color-text-subtle)]">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={doSignOut}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-[12.5px] font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                >
                  <LogOut size={13} aria-hidden="true" />
                  Sign out
                </button>
              </li>
            ) : (
              <li className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  to="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] border border-[color:var(--color-border)] text-sm font-medium text-[color:var(--color-secondary)]"
                >
                  <LogIn size={14} aria-hidden="true" />
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius)] border border-[color:var(--color-border)] text-sm font-medium text-[color:var(--color-text)]"
                >
                  <UserPlus size={14} aria-hidden="true" />
                  Sign up
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

function MenuItem({ to, onSelect, children }) {
  return (
    <Link
      role="menuitem"
      to={to}
      onClick={onSelect}
      className="flex items-center gap-2 px-3 py-2 text-[13px] text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-2)]"
    >
      {children}
    </Link>
  );
}
