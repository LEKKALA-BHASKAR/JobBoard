import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { useDebounce } from '../hooks/useDebounce';
import {
  matchesFilters,
  matchesSearch,
  paginate,
  sortJobs,
} from '../utils/jobsFilter';
import { FILTER_DEFAULTS, filtersAreEmpty, readFilters, writeFilters } from '../utils/urlFilters';
import { PAGE_SIZE, SORT_OPTIONS } from '../constants/enums';
import { JobCard } from '../components/JobCard';
import { JobCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { JobsFilters } from '../components/JobsFilters';
import { Pagination } from '../components/Pagination';
import { Select } from '../components/Input';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { pluralize } from '../utils/format';

// Count of active (non-default) filters, used for the mobile pill and reset UX.
function activeFilterCount(f) {
  let n = 0;
  if (f.category) n += 1;
  if (f.location) n += 1;
  n += f.workplace.length;
  n += f.employment.length;
  n += f.level.length;
  if (f.salaryMin !== FILTER_DEFAULTS.salaryMin) n += 1;
  if (f.salaryMax !== FILTER_DEFAULTS.salaryMax) n += 1;
  return n;
}

export default function JobsPage() {
  const { jobs, loading: initialLoading } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [queryInput, setQueryInput] = useState(filters.q);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  // Debounce the search input, then reflect into URL params.
  const debouncedQuery = useDebounce(queryInput, 220);
  useEffect(() => {
    if (debouncedQuery === filters.q) return;
    updateFilters({ ...filters, q: debouncedQuery, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // Sync input from URL when user hits back/forward.
  useEffect(() => {
    setQueryInput(filters.q);
  }, [filters.q]);

  // Simulated micro-loading state so skeletons flash briefly on filter change.
  // Serialize filter state once so exhaustive-deps sees a single stable value.
  const filterKey = JSON.stringify(filters);
  useEffect(() => {
    if (initialLoading) return undefined;
    setFilterLoading(true);
    const t = setTimeout(() => setFilterLoading(false), 160);
    return () => clearTimeout(t);
  }, [filterKey, initialLoading]);

  function updateFilters(next) {
    setSearchParams(writeFilters(next), { replace: false });
  }

  function resetFilters() {
    setQueryInput('');
    setSearchParams({}, { replace: false });
  }

  // Filter → sort → paginate. Memoized because it's the hot path for this page.
  const filtered = useMemo(() => {
    return jobs.filter(
      (j) => matchesSearch(j, filters.q) && matchesFilters(j, filters),
    );
    // Depend on the raw derived array; identity is stable per state update.
  }, [jobs, filters]);

  const sorted = useMemo(() => sortJobs(filtered, filters.sort), [filtered, filters.sort]);
  const paged = useMemo(
    () => paginate(sorted, filters.page, PAGE_SIZE),
    [sorted, filters.page],
  );

  const isEmptyFilters = filtersAreEmpty(filters) && !filters.q;
  const showSkeleton = initialLoading || filterLoading;
  const activeCount = activeFilterCount(filters);

  return (
    <>
      <SEO
        title="Browse jobs"
        description="Search across curated roles. Filter by category, location, workplace, employment type, and salary."
      />

      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6">
        <header className="mb-8 flex flex-col gap-2">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
            Every open role
          </p>
          <h1 className="font-display text-[40px] font-medium leading-[1.02] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
            Roles worth <em className="italic">reading twice.</em>
          </h1>
          <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
            Search across every verified listing. Filters and sort update the URL — share the exact view you’re looking at.
          </p>
        </header>

        {/* Search bar row */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="jobs-search" className="sr-only">
            Search jobs
          </label>
          <div className="flex h-10 flex-1 items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 focus-within:border-[color:var(--color-accent)]">
            <Search size={15} aria-hidden="true" className="text-[color:var(--color-text-subtle)]" />
            <input
              id="jobs-search"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search title, company, skill, or location…"
              className="w-full border-0 bg-transparent text-[14px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
            />
            {queryInput && (
              <button
                type="button"
                onClick={() => setQueryInput('')}
                aria-label="Clear search"
                className="rounded p-1 text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-text)]"
              >
                <X size={13} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="jobs-sort">
              Sort
            </label>
            <Select
              id="jobs-sort"
              value={filters.sort}
              onChange={(e) => updateFilters({ ...filters, sort: e.target.value, page: 1 })}
              className="h-10 min-w-[168px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </Select>
            <Button
              variant="secondary"
              size="md"
              className="h-10 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
              leftIcon={<SlidersHorizontal size={13} aria-hidden="true" />}
            >
              Filters
              {activeCount > 0 && (
                <span className="ml-1 rounded-full bg-[color:var(--color-accent-soft)] px-1.5 py-0.5 text-[11px] font-medium text-[color:var(--color-accent-text)]">
                  {activeCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <JobsFilters
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            mobileOpen={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
            activeCount={activeCount}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[13px] text-[color:var(--color-text-muted)]">
              <span>
                {showSkeleton
                  ? 'Loading roles…'
                  : `${paged.total} ${pluralize(paged.total, 'result', 'results')}${
                      isEmptyFilters ? '' : ' matching your filters'
                    }`}
              </span>
              <span>
                Showing {PAGE_SIZE} per page
              </span>
            </div>

            {showSkeleton ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : paged.total === 0 ? (
              <EmptyState
                icon={<Filter size={16} aria-hidden="true" />}
                title="No matching roles"
                description="Try loosening a filter or clearing your search. New roles are posted every day."
                action={
                  <Button variant="secondary" onClick={resetFilters}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                  {paged.jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                <div className="mt-8">
                  <Pagination
                    page={paged.page}
                    totalPages={paged.totalPages}
                    onChange={(p) => updateFilters({ ...filters, page: p })}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
