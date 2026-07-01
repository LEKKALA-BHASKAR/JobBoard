import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import { LogoAvatar } from './LogoAvatar';
import { Badge } from './Badge';
import { BookmarkButton } from './BookmarkButton';
import { formatRelative, formatSalaryRange } from '../utils/format';
import { LABEL_BY_VALUE, EMPLOYMENT_TYPES, WORKPLACE_TYPES } from '../constants/enums';

const empLabel = LABEL_BY_VALUE(EMPLOYMENT_TYPES);
const workLabel = LABEL_BY_VALUE(WORKPLACE_TYPES);

export function JobCard({ job }) {
  const skills = job.skills || [];
  const visibleSkills = skills.slice(0, 3);
  const extra = Math.max(0, skills.length - visibleSkills.length);

  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--color-border-strong)] hover:shadow-[var(--shadow-elev-2)] focus-within:border-[color:var(--color-accent)]">
      <Link
        to={`/jobs/${job.id}`}
        aria-label={`${job.title} at ${job.companyName}`}
        className="absolute inset-0 rounded-[inherit]"
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <LogoAvatar
            name={job.companyName}
            src={job.companyLogo}
            brandColor={job.companyColor}
            size={44}
          />
          <div className="min-w-0">
            <p className="text-[12.5px] font-medium text-[color:var(--color-text-muted)]">
              {job.companyName}
            </p>
            <h3 className="mt-0.5 truncate text-[15px] font-semibold leading-snug text-[color:var(--color-text)]">
              {job.title}
            </h3>
          </div>
        </div>
        <BookmarkButton jobId={job.id} jobTitle={job.title} className="relative z-20" />
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-[color:var(--color-text-muted)]">
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} aria-hidden="true" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase size={12} aria-hidden="true" />
          {empLabel[job.employment]}
        </span>
        <span className="text-[color:var(--color-text)]">
          {formatSalaryRange(job)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="accent">{workLabel[job.workplace]}</Badge>
        {visibleSkills.map((s) => (
          <Badge key={s} variant="neutral">
            {s}
          </Badge>
        ))}
        {extra > 0 && <Badge variant="outline">+{extra} more</Badge>}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
        <span className="text-[12px] text-[color:var(--color-text-subtle)]">
          {formatRelative(job.postedAt)}
        </span>
        <span className="relative z-20 inline-flex items-center gap-1 text-[12.5px] font-medium text-[color:var(--color-accent-text)] transition-transform group-hover:translate-x-0.5">
          View role
          <svg
            viewBox="0 0 12 12"
            width="12"
            height="12"
            aria-hidden="true"
            className="stroke-current"
          >
            <path
              d="M3 6h6M7 3l3 3-3 3"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </article>
  );
}
