import { SALARY_MAX, SALARY_MIN } from '../constants/enums';

// Round-trip filter state through URL search params so results are shareable
// and back/forward navigation restores exactly what the user was seeing.

const DEFAULTS = {
  q: '',
  category: '',
  location: '',
  workplace: [],
  employment: [],
  level: [],
  salaryMin: SALARY_MIN,
  salaryMax: SALARY_MAX,
  sort: 'latest',
  page: 1,
};

export function readFilters(params) {
  const arr = (name) =>
    (params.get(name) || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    q: params.get('q') || '',
    category: params.get('category') || '',
    location: params.get('location') || '',
    workplace: arr('workplace'),
    employment: arr('employment'),
    level: arr('level'),
    salaryMin: Number(params.get('salaryMin')) || SALARY_MIN,
    salaryMax: Number(params.get('salaryMax')) || SALARY_MAX,
    sort: params.get('sort') || 'latest',
    page: Math.max(1, Number(params.get('page')) || 1),
  };
}

export function writeFilters(state) {
  const out = {};
  const set = (k, v, def) => {
    if (Array.isArray(v)) {
      if (v.length) out[k] = v.join(',');
    } else if (v !== '' && v !== null && v !== undefined && v !== def) {
      out[k] = String(v);
    }
  };
  set('q', state.q, DEFAULTS.q);
  set('category', state.category, DEFAULTS.category);
  set('location', state.location, DEFAULTS.location);
  set('workplace', state.workplace, DEFAULTS.workplace);
  set('employment', state.employment, DEFAULTS.employment);
  set('level', state.level, DEFAULTS.level);
  set('salaryMin', state.salaryMin, DEFAULTS.salaryMin);
  set('salaryMax', state.salaryMax, DEFAULTS.salaryMax);
  set('sort', state.sort, DEFAULTS.sort);
  set('page', state.page, DEFAULTS.page);
  return out;
}

export function filtersAreEmpty(state) {
  return (
    !state.q &&
    !state.category &&
    !state.location &&
    !state.workplace.length &&
    !state.employment.length &&
    !state.level.length &&
    state.salaryMin === DEFAULTS.salaryMin &&
    state.salaryMax === DEFAULTS.salaryMax
  );
}

export const FILTER_DEFAULTS = DEFAULTS;
