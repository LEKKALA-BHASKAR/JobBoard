import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const COLS = [
  {
    heading: 'Platform',
    links: [
      { to: '/signup', label: 'Candidate signup' },
      { to: '/post-job', label: 'For employers' },
      { to: '/jobs', label: 'Browse open roles' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/', label: 'How it works' },
      { to: '/', label: 'Security' },
      { to: '/', label: 'Privacy policy' },
      { to: '/', label: 'Terms of service' },
    ],
  },
];

const CHIPS = ['SOC 2 in progress', 'Data encrypted', 'EU-GDPR'];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--color-border)] bg-[color:var(--color-surface-2)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-[color:var(--color-text-muted)]">
            The verified talent layer for staffing teams that trust their gut.
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {CHIPS.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-2.5 py-1 text-[11px] text-[color:var(--color-text-muted)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-subtle)]">
              {col.heading}
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13.5px] text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-[12px] text-[color:var(--color-text-subtle)] sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} Postline. Hand-built demo, real intent.</span>
          <span className="flex items-center gap-4">
            <Link to="/" className="hover:text-[color:var(--color-text)]">LinkedIn</Link>
            <Link to="/" className="hover:text-[color:var(--color-text)]">Twitter / X</Link>
            <Link to="/" className="hover:text-[color:var(--color-text)]">Email</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
