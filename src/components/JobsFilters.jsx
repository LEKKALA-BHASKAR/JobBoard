import { useEffect, useState } from 'react';
import { Filter, MapPin, RotateCcw, X } from 'lucide-react';
import {
  CATEGORIES,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  SALARY_MAX,
  SALARY_MIN,
  WORKPLACE_TYPES,
} from '../constants/enums';
import { Input } from './Input';
import { cn } from '../utils/cn';
import { formatCompact } from '../utils/format';

function toggleIn(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function FilterSection({ title, children }) {
  return (
    <section className="border-b border-[color:var(--color-border)] px-4 py-4 last:border-b-0">
      <h3 className="mb-2.5 text-[12px] font-semibold uppercase tracking-wider text-[color:var(--color-text-subtle)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function CheckList({ options, values, onChange, name }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {options.map((o) => {
        const checked = values.includes(o.value);
        const id = `${name}-${o.value}`;
        return (
          <li key={o.value}>
            <label
              htmlFor={id}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-[13.5px] transition-colors',
                checked
                  ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
                  : 'text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-3)] hover:text-[color:var(--color-text)]',
              )}
            >
              <input
                id={id}
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => onChange(o.value)}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded-[4px] border transition',
                  checked
                    ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]'
                    : 'border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]',
                )}
              >
                {checked && (
                  <svg viewBox="0 0 10 8" width="9" height="7" className="fill-none stroke-white">
                    <path
                      d="M1 4.2 3.8 7 9 1"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              {o.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function SalaryRange({ min, max, onChange }) {
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  useEffect(() => {
    setLocalMin(min);
    setLocalMax(max);
  }, [min, max]);

  const commit = (nextMin, nextMax) => {
    const clampedMin = Math.max(SALARY_MIN, Math.min(nextMin, nextMax - 5000));
    const clampedMax = Math.min(SALARY_MAX, Math.max(nextMax, nextMin + 5000));
    onChange({ min: clampedMin, max: clampedMax });
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[12.5px] text-[color:var(--color-text-muted)]">
        <span>{formatCompact(localMin, 'USD')}</span>
        <span>{formatCompact(localMax, 'USD')}</span>
      </div>
      <div className="relative py-1">
        <input
          type="range"
          aria-label="Minimum salary"
          min={SALARY_MIN}
          max={SALARY_MAX}
          step={5000}
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          onMouseUp={() => commit(localMin, localMax)}
          onTouchEnd={() => commit(localMin, localMax)}
          onKeyUp={(e) => e.key === 'Enter' && commit(localMin, localMax)}
        />
        <input
          type="range"
          aria-label="Maximum salary"
          min={SALARY_MIN}
          max={SALARY_MAX}
          step={5000}
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          onMouseUp={() => commit(localMin, localMax)}
          onTouchEnd={() => commit(localMin, localMax)}
          onKeyUp={(e) => e.key === 'Enter' && commit(localMin, localMax)}
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <label className="sr-only" htmlFor="salary-min">Min salary</label>
        <input
          id="salary-min"
          type="number"
          step="5000"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value) || SALARY_MIN)}
          onBlur={() => commit(localMin, localMax)}
          className="w-full rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-1 text-[12.5px] text-[color:var(--color-text)] focus:outline-none focus:border-[color:var(--color-accent)]"
        />
        <span aria-hidden="true" className="text-[color:var(--color-text-subtle)]">
          –
        </span>
        <label className="sr-only" htmlFor="salary-max">Max salary</label>
        <input
          id="salary-max"
          type="number"
          step="5000"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value) || SALARY_MAX)}
          onBlur={() => commit(localMin, localMax)}
          className="w-full rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-2 py-1 text-[12.5px] text-[color:var(--color-text)] focus:outline-none focus:border-[color:var(--color-accent)]"
        />
      </div>
    </div>
  );
}

export function JobsFilters({
  filters,
  onChange,
  onReset,
  mobileOpen,
  onCloseMobile,
  activeCount,
}) {
  const setPatch = (patch) => onChange({ ...filters, ...patch, page: 1 });

  const contents = (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-3">
        <div className="flex items-center gap-2 text-[13.5px] font-semibold text-[color:var(--color-text)]">
          <Filter size={14} aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-[color:var(--color-accent-soft)] px-1.5 py-0.5 text-[11px] font-medium text-[color:var(--color-accent-text)]">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-[12.5px] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-3)] hover:text-[color:var(--color-text)]"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close filters"
            className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-3)] lg:hidden"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <FilterSection title="Category">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setPatch({ category: '' })}
            className={cn(
              'inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-[13.5px] transition-colors',
              !filters.category
                ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
                : 'text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-3)] hover:text-[color:var(--color-text)]',
            )}
          >
            All categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setPatch({ category: filters.category === c.value ? '' : c.value })}
              className={cn(
                'inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-[13.5px] transition-colors',
                filters.category === c.value
                  ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
                  : 'text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-3)] hover:text-[color:var(--color-text)]',
              )}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: c.accent }}
              />
              {c.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Location">
        <Input
          leftIcon={<MapPin size={13} aria-hidden="true" />}
          placeholder="e.g. Remote, London, NYC"
          value={filters.location}
          onChange={(e) => setPatch({ location: e.target.value })}
        />
      </FilterSection>

      <FilterSection title="Workplace">
        <CheckList
          name="workplace"
          options={WORKPLACE_TYPES}
          values={filters.workplace}
          onChange={(v) => setPatch({ workplace: toggleIn(filters.workplace, v) })}
        />
      </FilterSection>

      <FilterSection title="Employment type">
        <CheckList
          name="employment"
          options={EMPLOYMENT_TYPES}
          values={filters.employment}
          onChange={(v) => setPatch({ employment: toggleIn(filters.employment, v) })}
        />
      </FilterSection>

      <FilterSection title="Experience">
        <CheckList
          name="level"
          options={EXPERIENCE_LEVELS}
          values={filters.level}
          onChange={(v) => setPatch({ level: toggleIn(filters.level, v) })}
        />
      </FilterSection>

      <FilterSection title="Salary (annualized, USD)">
        <SalaryRange
          min={filters.salaryMin}
          max={filters.salaryMax}
          onChange={({ min, max }) => setPatch({ salaryMin: min, salaryMax: max })}
        />
      </FilterSection>
    </div>
  );

  return (
    <>
      <aside className="sticky top-[72px] hidden h-[calc(100vh-88px)] w-[268px] shrink-0 overflow-hidden overflow-y-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] lg:block">
        {contents}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            aria-label="Close filters"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[320px] flex-col overflow-y-auto bg-[color:var(--color-surface)] shadow-[var(--shadow-elev-3)]">
            {contents}
          </div>
        </div>
      )}
    </>
  );
}
