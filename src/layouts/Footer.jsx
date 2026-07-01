import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const COLS = [
  {
    heading: 'Product',
    links: [
      { to: '/jobs', label: 'Browse jobs' },
      { to: '/post-job', label: 'Post a job' },
      { to: '/bookmarks', label: 'Bookmarks' },
      { to: '/my-jobs', label: 'My posts' },
    ],
  },
  {
    heading: 'For candidates',
    links: [
      { to: '/jobs?workplace=remote', label: 'Remote roles' },
      { to: '/jobs?category=engineering', label: 'Engineering roles' },
      { to: '/jobs?category=design', label: 'Design roles' },
      { to: '/jobs?category=product', label: 'Product roles' },
    ],
  },
  {
    heading: 'For employers',
    links: [
      { to: '/post-job', label: 'Post a listing' },
      { to: '/jobs?level=lead', label: 'Leadership roles' },
      { to: '/jobs?employment=internship', label: 'Internships' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/', label: 'About Postline' },
      { to: '/', label: 'Careers' },
      { to: '/', label: 'Contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)] bg-[color:var(--color-surface-2)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-[color:var(--color-text-muted)]">
            A curated job board for engineers, designers, product managers, and operators —
            focused on high-craft teams building modern software.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-[color:var(--color-text-subtle)]">
              {col.heading}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
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
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-[12.5px] text-[color:var(--color-text-subtle)] sm:flex-row sm:items-center sm:px-6">
          <span>© {new Date().getFullYear()} Postline. A demo job board.</span>
          <span>Built with care, hand-crafted UI, and open web tech.</span>
        </div>
      </div>
    </footer>
  );
}
