import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useJobs } from '../../context/JobsContext';
import { useAuth } from '../../context/AuthContext';
import { computeStats } from '../../utils/jobsFilter';
import { CATEGORIES } from '../../constants/enums';

export default function AdminDashboardPage() {
  const { jobs, bookmarks } = useJobs();
  const { users, currentUser } = useAuth();

  const stats = useMemo(() => computeStats(jobs), [jobs]);
  const catCounts = useMemo(() => {
    const counts = Object.fromEntries(CATEGORIES.map((c) => [c.value, 0]));
    for (const j of jobs) if (counts[j.category] != null) counts[j.category]++;
    return counts;
  }, [jobs]);
  const recent = useMemo(
    () =>
      [...jobs]
        .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
        .slice(0, 5),
    [jobs],
  );

  const maxCat = Math.max(1, ...Object.values(catCounts));

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[12px] font-medium uppercase tracking-wider text-[color:var(--color-text-subtle)]">
          Dashboard
        </p>
        <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)]">
          Welcome back, {currentUser?.name?.split(' ')[0] ?? 'Admin'}
        </h1>
        <p className="mt-1 text-[13.5px] text-[color:var(--color-text-muted)]">
          A quick snapshot of the platform. Everything here reads from your local mock data.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Briefcase size={16} aria-hidden="true" />}
          label="Total jobs"
          value={stats.totalJobs.toLocaleString()}
          accent="orange"
        />
        <StatCard
          icon={<Building2 size={16} aria-hidden="true" />}
          label="Companies"
          value={stats.totalCompanies.toLocaleString()}
          accent="blue"
        />
        <StatCard
          icon={<Users size={16} aria-hidden="true" />}
          label="Registered users"
          value={users.length.toLocaleString()}
          accent="blue"
        />
        <StatCard
          icon={<Bookmark size={16} aria-hidden="true" />}
          label="Bookmarks"
          value={bookmarks.length.toLocaleString()}
          accent="orange"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-[color:var(--color-text)]">
                Jobs by category
              </h2>
              <p className="text-[12.5px] text-[color:var(--color-text-muted)]">
                Distribution across the {CATEGORIES.length} tracked categories.
              </p>
            </div>
            <TrendingUp
              size={14}
              aria-hidden="true"
              className="text-[color:var(--color-secondary)]"
            />
          </div>
          <ul className="flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => {
              const count = catCounts[cat.value] || 0;
              const pct = Math.round((count / maxCat) * 100);
              return (
                <li key={cat.value} className="flex items-center gap-3 text-[13px]">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: cat.accent }}
                    aria-hidden="true"
                  />
                  <span className="w-32 shrink-0 truncate text-[color:var(--color-text)]">
                    {cat.label}
                  </span>
                  <div className="flex-1 overflow-hidden rounded-full bg-[color:var(--color-surface-3)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-1.5 rounded-full"
                      style={{ background: cat.accent }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right tabular-nums text-[color:var(--color-text-muted)]">
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-[color:var(--color-text)]">
                Recent postings
              </h2>
              <p className="text-[12.5px] text-[color:var(--color-text-muted)]">
                Latest jobs across the platform.
              </p>
            </div>
            <Link
              to="/admin/jobs"
              className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[color:var(--color-secondary-text)] hover:text-[color:var(--color-secondary)]"
            >
              Manage
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-[color:var(--color-border)]">
            {recent.map((j) => (
              <li key={j.id} className="flex items-center gap-3 py-2.5 text-[13px]">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-[color:var(--color-text)]">
                    {j.title}
                  </div>
                  <div className="truncate text-[12px] text-[color:var(--color-text-subtle)]">
                    {j.company} · {j.location}
                  </div>
                </div>
                <Link
                  to={`/jobs/${j.id}`}
                  className="shrink-0 text-[12px] font-medium text-[color:var(--color-secondary-text)] hover:text-[color:var(--color-secondary)]"
                >
                  View
                </Link>
              </li>
            ))}
            {!recent.length && (
              <li className="py-6 text-center text-[12.5px] text-[color:var(--color-text-subtle)]">
                No jobs yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, accent }) {
  const chip =
    accent === 'orange'
      ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
      : 'bg-[color:var(--color-secondary-soft)] text-[color:var(--color-secondary-text)]';
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] ${chip}`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3 text-[24px] font-semibold tracking-tight text-[color:var(--color-text)]">
        {value}
      </div>
      <div className="text-[12px] uppercase tracking-wider text-[color:var(--color-text-subtle)]">
        {label}
      </div>
    </div>
  );
}
