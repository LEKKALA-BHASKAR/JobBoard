import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
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
        description="Behind every résumé is someone's rent, someone's family, someone's dream. Curated roles from teams who care about craft."
      />

      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[color:var(--color-canvas)]">
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-center text-[15vw] font-medium leading-[0.92] text-[color:var(--color-text)] sm:text-[13vw] md:text-[136px]"
          >
            Hiring should <em className="italic">feel</em>
            <br />
            <span className="italic">human.</span>
          </motion.h1>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center">
            <SquiggleUnderline />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-center text-[19px] italic leading-[1.55] text-[color:var(--color-text-muted)] sm:text-[21px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Behind every résumé is someone’s rent, someone’s family, someone’s
              dream. And behind every bad hire is a team that paid for it.{' '}
              <span className="terra-underline">
                In the era of AI, we put our trust in humans.
              </span>
            </motion.p>
          </div>

          {/* Persona cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2"
          >
            <PersonaCard
              to="/jobs"
              variant="cream"
              eyebrow="For candidates"
              title="I’m looking for work"
              copy="10 minutes to register. We take care of the rest until you’re holding an offer."
            />
            <PersonaCard
              to="/post-job"
              variant="ink"
              eyebrow="For recruiters"
              title="I’m hiring talent"
              copy="We verify everything that matters to you, before you meet. A shortlist of 3–5 in days, not 200 CVs."
            />
          </motion.div>

          {/* Utility search — under the fold of the editorial statement */}
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-16 flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-0"
          >
            <label htmlFor="hero-search" className="sr-only">
              Search jobs
            </label>
            <div className="flex h-12 flex-1 items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 focus-within:border-[color:var(--color-accent)] sm:rounded-r-none">
              <Search size={16} aria-hidden="true" className="text-[color:var(--color-text-subtle)]" />
              <input
                id="hero-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, company, or skill…"
                className="w-full border-0 bg-transparent text-[14.5px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-full sm:rounded-l-none"
              rightIcon={<ArrowRight size={14} aria-hidden="true" />}
            >
              Search {stats.totalJobs.toLocaleString()} roles
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] text-[color:var(--color-text-subtle)]">
            <span className="uppercase tracking-[0.16em]">Popular</span>
            <span aria-hidden="true">·</span>
            {['React', 'Design systems', 'Rust', 'Product Manager', 'Growth'].map(
              (k) => (
                <Link
                  key={k}
                  to={`/jobs?q=${encodeURIComponent(k)}`}
                  className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2.5 py-1 transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-text)]"
                >
                  {k}
                </Link>
              ),
            )}
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
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--color-accent-text)] hover:underline"
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
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--color-accent-text)] hover:underline"
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

      {/* Stats strip */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="grid grid-cols-3 divide-x divide-[color:var(--color-border)] rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <Stat label="Open roles" value={stats.totalJobs.toLocaleString()} />
          <Stat label="Companies" value={stats.totalCompanies.toLocaleString()} />
          <Stat label="Remote-friendly" value={`${stats.remotePct}%`} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-ink)] p-8 sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 90% 0%, rgba(224, 134, 97, 0.22), transparent 70%)',
            }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_auto] md:items-end">
            <div>
              <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-white/50">
                For hiring teams
              </p>
              <h2 className="mt-3 font-display text-[36px] font-medium leading-[1.02] text-white sm:text-[48px]">
                Post a role in{' '}
                <em className="italic text-[color:var(--color-accent)]">
                  under 60 seconds.
                </em>
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
                Reach candidates who care about craft and quality. Your listing
                goes live instantly — no approvals, no ads on your page.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Link
                to="/post-job"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 text-[14.5px] font-medium text-white transition hover:bg-[color:var(--color-accent-hover)]"
              >
                Post a job
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[14.5px] font-medium text-white transition hover:bg-white/10"
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

function SquiggleUnderline() {
  return (
    <svg
      width="260"
      height="16"
      viewBox="0 0 260 16"
      fill="none"
      aria-hidden="true"
      className="mx-auto"
    >
      <path
        d="M4 10 C 40 2, 70 14, 108 8 S 180 2, 216 10 S 250 4, 256 8"
        className="squiggle-underline"
      />
    </svg>
  );
}

function PersonaCard({ to, variant, eyebrow, title, copy }) {
  const isInk = variant === 'ink';
  return (
    <Link
      to={to}
      className={`group relative block rounded-[var(--radius-lg)] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${
        isInk
          ? 'bg-[color:var(--color-ink)] text-white shadow-[var(--shadow-elev-3)]'
          : 'bg-white text-[color:var(--color-text)] shadow-[var(--shadow-elev-2)]'
      }`}
      style={
        isInk
          ? undefined
          : {
              // Terracotta offset shadow — visible bar along the bottom-left
              boxShadow:
                '0 8px 0 -1px var(--color-accent), 0 24px 40px -12px rgba(26,22,19,0.15)',
            }
      }
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className={`text-[11.5px] font-medium uppercase tracking-[0.18em] ${
            isInk ? 'text-white/55' : 'text-[color:var(--color-text-subtle)]'
          }`}
        >
          {eyebrow}
        </p>
        <span
          aria-hidden="true"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
            isInk ? 'text-white' : 'text-[color:var(--color-text)]'
          }`}
        >
          <ArrowUpRight size={22} />
        </span>
      </div>

      <h3
        className={`font-display mt-6 text-[30px] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-[34px] ${
          isInk ? 'text-white' : 'text-[color:var(--color-text)]'
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-4 max-w-sm text-[14.5px] leading-relaxed ${
          isInk ? 'text-white/70' : 'text-[color:var(--color-text-muted)]'
        }`}
      >
        {copy}
      </p>
    </Link>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="font-display text-[38px] font-medium leading-none tracking-tight text-[color:var(--color-text)] tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-text-subtle)]">
        {label}
      </div>
    </div>
  );
}

function Section({ title, subtitle, rightSlot, children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] font-medium tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[36px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
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
