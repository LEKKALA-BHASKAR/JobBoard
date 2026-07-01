import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import { SEO } from '../components/SEO';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/admin/users', label: 'Users', icon: Users },
];

export function AdminLayout() {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return <Navigate to="/signin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <>
      <SEO title="Admin" description="Postline admin panel" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-20 md:self-start">
          <div className="mb-3 flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]">
              <ShieldCheck size={16} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-medium text-[color:var(--color-text)]">
                Admin panel
              </div>
              <div className="truncate text-[11.5px] text-[color:var(--color-text-subtle)]">
                {currentUser.email}
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Admin">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13.5px] font-medium transition-colors',
                    isActive
                      ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
                      : 'text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-2)] hover:text-[color:var(--color-text)]',
                  )
                }
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/"
              className="mt-3 flex items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13px] text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-text)]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to site
            </NavLink>
          </nav>
        </aside>

        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </>
  );
}
