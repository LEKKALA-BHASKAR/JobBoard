import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { CATEGORIES } from '../constants/enums';
import { computeStats, featuredJobs } from '../utils/jobsFilter';
import { JobCard } from '../components/JobCard';
import { JobCardSkeleton } from '../components/Skeleton';
import { CategoryChip } from '../components/CategoryChip';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';

export default function HomePage() {
  const { jobs, loading } = useJobs();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const stats = useMemo(() => computeStats(jobs), [jobs]);
  const featured = useMemo(() => featuredJobs(jobs, 3), [jobs]);
  const recent = useMemo(
    () =>
      [...jobs]
        .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
        .slice(0, 6),
    [jobs],
  );
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const j of jobs) counts[j.category] = (counts[j.category] || 0) + 1;
    return counts;
  }, [jobs]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : '/jobs');
  };

  return (
    <>
      <SEO
        title="Find your next role"
        description="Browse hand-curated roles from high-craft software teams. Engineering, design, product, sales, marketing, data — all in one place."
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-border)] bg-[color:var(--color-canvas)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.55]"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, rgba(99, 102, 241, 0.18), transparent 70%), radial-gradient(40% 40% at 20% 20%, rgba(236, 72, 153, 0.10), transparent 70%)',
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2.5 py-1 text-[12px] font-medium text-[color:var(--color-text-muted)]">
              <Sparkles size={12} aria-hidden="true" className="text-[color:var(--color-accent)]" />
              {stats.totalJobs} open roles this week
            </span>
            <h1 className="mt-5 text-[38px] font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
              The job board built for
              <br />
              <span className="text-[color:var(--color-text-muted)]">people who care about craft.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-[color:var(--color-text-muted)]">
              Curated roles from teams like Linear, Vercel, Figma, and Stripe. No spam,
              no re-listings, no lorem ipsum — just real jobs from real teams.
            </p>

            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-0"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search jobs
              </label>
              <div className="flex h-11 flex-1 items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3.5 focus-within:border-[color:var(--color-accent)] sm:rounded-r-none">
                <Search size={16} aria-hidden="true" className="text-[color:var(--color-text-subtle)]" />
                <input
                  id="hero-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, company, or skill…"
                  className="w-full border-0 bg-transparent text-[14px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-11 sm:rounded-l-none"
                rightIcon={<ArrowRight size={14} aria-hidden="true" />}
              >
                Search
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] text-[color:var(--color-text-subtle)]">
              <span>Popular:</span>
              {['React', 'Design systems', 'Rust', 'Product Manager', 'Growth'].map((k) => (
                <Link
                  key={k}
                  to={`/jobs?q=${encodeURIComponent(k)}`}
                  className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-0.5 transition-colors hover:text-[color:var(--color-text)]"
                >
                  {k}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stats strip */}
          <div className="mx-auto grid w-full max-w-3xl grid-cols-3 divide-x divide-[color:var(--color-border)] rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
            <Stat label="Open roles" value={stats.totalJobs.toLocaleString()} />
            <Stat label="Companies" value={stats.totalCompanies.toLocaleString()} />
            <Stat label="Remote-friendly" value={`${stats.remotePct}%`} />
          </div>
        </div>
      </section>

      {/* Featured */}
      <Section
        title="Featured this week"
        subtitle="Roles with strong compensation, fresh timing, and teams worth knowing."
        rightSlot={
          <Link
            to="/jobs?sort=salary-desc"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--color-accent-text)]"
          >
            See all
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)
            : featured.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </Section>

      {/* Categories */}
      <Section
        title="Browse by category"
        subtitle="Filter to what you do. Click any category to see matching open roles."
      >
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.value}
              category={cat}
              count={categoryCounts[cat.value] || 0}
              to={`/jobs?category=${cat.value}`}
            />
          ))}
        </div>
      </Section>

      {/* Recent */}
      <Section
        title="Recently posted"
        subtitle="Fresh roles from teams hiring right now."
        rightSlot={
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--color-accent-text)]"
          >
            Browse all
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
            : recent.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 60% at 90% 0%, rgba(99, 102, 241, 0.10), transparent 70%)',
            }}
          />
          <div className="relative grid gap-6 md:grid-cols-[1.5fr_auto] md:items-center">
            <div>
              <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)] sm:text-[28px]">
                Hiring? Post a role in under 60 seconds.
              </h2>
              <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-[color:var(--color-text-muted)]">
                Reach candidates who care about craft and quality. Your listing goes live
                instantly — no approvals, no ads on your page.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Link
                to="/post-job"
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-accent)] px-5 text-[14.5px] font-medium text-white transition hover:bg-[color:var(--color-accent-hover)]"
              >
                Post a job
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 text-[14.5px] font-medium text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-3)]"
              >
                Browse open roles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="text-[22px] font-semibold tracking-tight text-[color:var(--color-text)]">
        {value}
      </div>
      <div className="text-[12px] uppercase tracking-wider text-[color:var(--color-text-subtle)]">
        {label}
      </div>
    </div>
  );
}

function Section({ title, subtitle, rightSlot, children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)] sm:text-[26px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-[color:var(--color-text-muted)]">
              {subtitle}
            </p>
          )}
        </div>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}
