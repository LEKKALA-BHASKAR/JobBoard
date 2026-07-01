const CURRENCY_SYMBOL = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
};

export function formatCompact(value, currency = 'USD') {
  if (!Number.isFinite(value)) return '—';
  const sym = CURRENCY_SYMBOL[currency] ?? '';
  if (value >= 1000) return `${sym}${Math.round(value / 1000)}k`;
  return `${sym}${value}`;
}

export function formatSalaryRange(job) {
  if (!job) return '—';
  const { salaryMin, salaryMax, currency, salaryUnit } = job;
  const unit = salaryUnit === 'hour' ? ' / hr' : '';
  return `${formatCompact(salaryMin, currency)}–${formatCompact(salaryMax, currency)}${unit}`;
}

// Renders "posted" as a compact relative label.
export function formatRelative(iso) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const min = Math.floor(diff / 60_000);
  const hr = Math.floor(diff / 3_600_000);
  const day = Math.floor(diff / 86_400_000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  const yr = Math.floor(day / 365);
  return `${yr}y ago`;
}

// Generate 1–3 letter initials from a company name for the fallback avatar.
export function initials(name) {
  if (!name) return '?';
  const parts = String(name)
    .trim()
    .split(/[\s.\-_/]+/)
    .filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic pastel-ish color from any input string.
export function colorFromString(str) {
  const hues = [210, 265, 330, 25, 155, 190, 85, 300];
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  const hue = hues[hash % hues.length];
  return `hsl(${hue} 45% 45%)`;
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
