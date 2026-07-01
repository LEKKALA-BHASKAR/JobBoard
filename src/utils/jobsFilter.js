import { SALARY_MAX, SALARY_MIN } from '../constants/enums';

// All filter/sort/search logic lives here as pure functions so it can be
// unit-tested in isolation from the React tree.

const norm = (s) => (typeof s === 'string' ? s.toLowerCase().trim() : '');

// Normalize any listed salary into annual-USD-ish so comparisons across
// currencies / units are at least directionally correct without a real FX table.
const CURRENCY_TO_USD = { USD: 1, EUR: 1.08, GBP: 1.28, CAD: 0.73, AUD: 0.66 };
const HOURS_PER_YEAR = 40 * 52;

function annualizedUsd(job, side) {
  const rate = CURRENCY_TO_USD[job.currency] ?? 1;
  const raw = side === 'min' ? job.salaryMin : job.salaryMax;
  const yearly = job.salaryUnit === 'hour' ? raw * HOURS_PER_YEAR : raw;
  return yearly * rate;
}

export function matchesSearch(job, q) {
  if (!q) return true;
  const needle = norm(q);
  const hay = [
    job.title,
    job.companyName,
    job.location,
    job.summary,
    ...(job.skills || []),
  ]
    .map(norm)
    .join(' | ');
  return hay.includes(needle);
}

export function matchesFilters(job, f) {
  if (!f) return true;
  if (f.category && job.category !== f.category) return false;
  if (f.workplace?.length && !f.workplace.includes(job.workplace)) return false;
  if (f.employment?.length && !f.employment.includes(job.employment)) return false;
  if (f.level?.length && !f.level.includes(job.level)) return false;
  if (f.location) {
    if (!norm(job.location).includes(norm(f.location))) return false;
  }
  if (Number.isFinite(f.salaryMin) && f.salaryMin > SALARY_MIN) {
    if (annualizedUsd(job, 'max') < f.salaryMin) return false;
  }
  if (Number.isFinite(f.salaryMax) && f.salaryMax < SALARY_MAX) {
    if (annualizedUsd(job, 'min') > f.salaryMax) return false;
  }
  if (f.ids) {
    if (!f.ids.includes(job.id)) return false;
  }
  return true;
}

export function sortJobs(jobs, sort) {
  const arr = [...jobs];
  switch (sort) {
    case 'oldest':
      return arr.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
    case 'salary-desc':
      return arr.sort((a, b) => annualizedUsd(b, 'max') - annualizedUsd(a, 'max'));
    case 'salary-asc':
      return arr.sort((a, b) => annualizedUsd(a, 'min') - annualizedUsd(b, 'min'));
    case 'company-asc':
      return arr.sort((a, b) => a.companyName.localeCompare(b.companyName));
    case 'latest':
    default:
      return arr.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }
}

export function paginate(jobs, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(jobs.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    jobs: jobs.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: jobs.length,
  };
}

export function similarJobs(job, allJobs, limit = 3) {
  if (!job) return [];
  const skills = new Set((job.skills || []).map(norm));
  return allJobs
    .filter((j) => j.id !== job.id)
    .map((j) => {
      const shared = (j.skills || []).filter((s) => skills.has(norm(s))).length;
      const categoryBonus = j.category === job.category ? 2 : 0;
      return { job: j, score: shared + categoryBonus };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.job);
}

export function featuredJobs(jobs, limit = 3) {
  return [...jobs]
    .sort((a, b) => {
      const recencyA = new Date(a.postedAt).getTime();
      const recencyB = new Date(b.postedAt).getTime();
      const salaryA = annualizedUsd(a, 'max');
      const salaryB = annualizedUsd(b, 'max');
      // Blend recency and top-band salary. Newer + higher-paying rises to the top.
      return salaryB + recencyB / 1e10 - (salaryA + recencyA / 1e10);
    })
    .slice(0, limit);
}

export function computeStats(jobs) {
  const companies = new Set(jobs.map((j) => j.companyName));
  const remoteCount = jobs.filter((j) => j.workplace === 'remote').length;
  return {
    totalJobs: jobs.length,
    totalCompanies: companies.size,
    remotePct: jobs.length ? Math.round((remoteCount / jobs.length) * 100) : 0,
  };
}
