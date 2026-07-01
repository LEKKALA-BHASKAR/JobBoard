import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

function LostSvg() {
  // Hand-drawn on-brand illustration — a "misplaced envelope" motif that
  // matches the brief of a small, deliberate not-found affordance.
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-40 w-auto sm:h-52"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nf-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="200" rx="16" fill="url(#nf-g)" />
      <g transform="translate(56, 40)">
        <rect
          x="0"
          y="20"
          width="180"
          height="110"
          rx="10"
          fill="var(--color-surface)"
          stroke="var(--color-border)"
          strokeWidth="1.4"
        />
        <path
          d="M0 30 L90 90 L180 30"
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="1.4"
        />
        <text
          x="90"
          y="80"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-sans)"
        >
          404
        </text>
        <g transform="translate(150, 108)">
          <circle r="16" fill="var(--color-accent)" opacity="0.16" />
          <circle r="8" fill="var(--color-accent)" />
          <path d="M-2 0 L1.5 3 L4 -2" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

export function NotFoundInline({ title = 'Page not found', description }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <LostSvg />
      <h1 className="font-display text-[36px] font-medium leading-[1.05] tracking-[-0.02em] text-[color:var(--color-text)]">
        {title}
      </h1>
      <p className="text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
        {description ||
          "We couldn't find what you were looking for. It may have been removed or the link is off."}
      </p>
      <div className="mt-2 flex gap-2">
        <Link to="/">
          <Button>Back to home</Button>
        </Link>
        <Link to="/jobs">
          <Button variant="secondary">Browse jobs</Button>
        </Link>
      </div>
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found" description="We couldn't find that page." />
      <NotFoundInline />
    </>
  );
}
