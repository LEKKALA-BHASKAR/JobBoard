import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Check,
  ExternalLink,
  MapPin,
  Pencil,
  Share2,
  Trash2,
  Users,
} from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import { LogoAvatar } from '../components/LogoAvatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { BookmarkButton } from '../components/BookmarkButton';
import { JobCard } from '../components/JobCard';
import { SEO } from '../components/SEO';
import { formatRelative, formatSalaryRange } from '../utils/format';
import { similarJobs } from '../utils/jobsFilter';
import {
  CATEGORIES,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  LABEL_BY_VALUE,
  WORKPLACE_TYPES,
} from '../constants/enums';
import { NotFoundInline } from './NotFoundPage';

const empLabel = LABEL_BY_VALUE(EMPLOYMENT_TYPES);
const workLabel = LABEL_BY_VALUE(WORKPLACE_TYPES);
const levelLabel = LABEL_BY_VALUE(EXPERIENCE_LEVELS);
const catLabel = LABEL_BY_VALUE(CATEGORIES);

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, loading, isMine, deleteJob } = useJobs();
  const toast = useToast();
  const [applyOpen, setApplyOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const job = useMemo(() => jobs.find((j) => j.id === id), [jobs, id]);
  const similar = useMemo(() => similarJobs(job, jobs, 3), [job, jobs]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-sm text-[color:var(--color-text-muted)] sm:px-6">
        Loading role…
      </div>
    );
  }
  if (!job) return <NotFoundInline title="Role not found" />;

  const mine = isMine(job.id);

  const onShare = async () => {
    const url = `${window.location.origin}/jobs/${job.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${job.title} — ${job.companyName}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
      }
    } catch {
      // User cancelled share, or clipboard blocked. Silent.
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    try {
      await deleteJob(job.id);
      toast.success('Listing deleted');
      navigate('/jobs');
    } catch {
      toast.error('Could not delete the listing');
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  return (
    <>
      <SEO
        title={`${job.title} at ${job.companyName}`}
        description={job.summary}
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          <nav aria-label="Breadcrumb" className="mb-4 text-[12.5px] text-[color:var(--color-text-subtle)]">
            <Link to="/jobs" className="hover:text-[color:var(--color-text)]">
              Jobs
            </Link>{' '}
            /{' '}
            <Link
              to={`/jobs?category=${job.category}`}
              className="hover:text-[color:var(--color-text)]"
            >
              {catLabel[job.category]}
            </Link>
          </nav>

          <div className="flex items-start gap-4">
            <LogoAvatar
              name={job.companyName}
              src={job.companyLogo}
              brandColor={job.companyColor}
              size={56}
              rounded="lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    to={`/jobs?q=${encodeURIComponent(job.companyName)}`}
                    className="text-[13.5px] font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                  >
                    {job.companyName}
                  </Link>
                  <h1 className="mt-1 text-[24px] font-semibold tracking-[-0.01em] text-[color:var(--color-text)] sm:text-[28px]">
                    {job.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkButton jobId={job.id} jobTitle={job.title} />
                  <Button variant="secondary" size="sm" onClick={onShare} leftIcon={<Share2 size={13} aria-hidden="true" />}>
                    Share
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13.5px] text-[color:var(--color-text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} aria-hidden="true" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={13} aria-hidden="true" />
                  {empLabel[job.employment]}
                </span>
                <span className="text-[color:var(--color-text)]">
                  {formatSalaryRange(job)}
                </span>
                <span>Posted {formatRelative(job.postedAt)}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge variant="accent">{workLabel[job.workplace]}</Badge>
                <Badge variant="outline">{levelLabel[job.level]}</Badge>
                <Badge variant="outline">{catLabel[job.category]}</Badge>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button size="lg" onClick={() => setApplyOpen(true)}>
                  Apply now
                </Button>
                {mine && (
                  <>
                    <Link to={`/edit-job/${job.id}`}>
                      <Button variant="secondary" size="lg" leftIcon={<Pencil size={14} aria-hidden="true" />}>
                        Edit listing
                      </Button>
                    </Link>
                    <Button
                      variant="dangerGhost"
                      size="lg"
                      onClick={() => setDeleteOpen(true)}
                      leftIcon={<Trash2 size={14} aria-hidden="true" />}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <section className="mt-10 border-t border-[color:var(--color-border)] pt-8">
            <h2 className="text-[15px] font-semibold text-[color:var(--color-text)]">
              About the role
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-text-muted)]">
              {job.summary}
            </p>

            <SubSection title="Responsibilities" items={job.responsibilities} />
            <SubSection title="Requirements" items={job.requirements} />
            <SubSection title="What we offer" items={job.benefits} />

            {job.skills?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[13.5px] font-semibold text-[color:var(--color-text)]">
                  Skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.skills.map((s) => (
                    <Badge key={s} variant="neutral">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </section>
        </article>

        <aside className="flex flex-col gap-4">
          <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
            <div className="flex items-center gap-3">
              <LogoAvatar
                name={job.companyName}
                src={job.companyLogo}
                brandColor={job.companyColor}
                size={44}
              />
              <div>
                <div className="text-[14px] font-semibold text-[color:var(--color-text)]">
                  {job.companyName}
                </div>
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12.5px] text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                >
                  Visit website
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
            </div>
            {job.companyTagline && (
              <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--color-text-muted)]">
                {job.companyTagline}
              </p>
            )}
            <dl className="mt-4 grid grid-cols-1 gap-2 text-[12.5px]">
              {job.companyHq && (
                <FactRow
                  icon={<Building2 size={12} aria-hidden="true" />}
                  label="HQ"
                  value={job.companyHq}
                />
              )}
              {job.companySize && (
                <FactRow
                  icon={<Users size={12} aria-hidden="true" />}
                  label="Size"
                  value={`${job.companySize} employees`}
                />
              )}
            </dl>
          </div>

          {similar.length > 0 && (
            <div>
              <h2 className="mb-3 text-[13.5px] font-semibold text-[color:var(--color-text)]">
                Similar roles
              </h2>
              <div className="flex flex-col gap-3">
                {similar.map((s) => (
                  <JobCard key={s.id} job={s} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <ApplyModal
        open={applyOpen}
        onClose={() => {
          setApplyOpen(false);
          setApplied(false);
        }}
        job={job}
        applied={applied}
        onSubmit={() => {
          setApplied(true);
          toast.success('Application sent!', {
            title: `Applied to ${job.title}`,
          });
        }}
      />

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete this listing?"
        description="This will permanently remove the listing from the board and from anyone who bookmarked it. This action cannot be undone."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleting} onClick={onDelete}>
              Delete listing
            </Button>
          </>
        }
      >
        <div className="rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-3 text-[13.5px] text-[color:var(--color-text-muted)]">
          <span className="font-medium text-[color:var(--color-text)]">{job.title}</span>{' '}
          at {job.companyName}
        </div>
      </Modal>
    </>
  );
}

function SubSection({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-8">
      <h3 className="text-[13.5px] font-semibold text-[color:var(--color-text)]">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-border-strong)]" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[color:var(--color-surface-2)] px-2.5 py-1.5">
      <span className="inline-flex items-center gap-1.5 text-[color:var(--color-text-subtle)]">
        {icon}
        {label}
      </span>
      <span className="text-[color:var(--color-text)]">{value}</span>
    </div>
  );
}

function ApplyModal({ open, onClose, job, applied, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', note: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onSubmit(form);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={applied ? 'Application received' : `Apply to ${job.title}`}
      description={
        applied
          ? 'The hiring team will review your application and get back to you soon. Good luck!'
          : `Send a short intro to the team at ${job.companyName}.`
      }
      size="md"
      footer={
        applied ? (
          <Button onClick={onClose}>Done</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="apply-form">
              Submit application
            </Button>
          </>
        )
      }
    >
      {applied ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]">
            <Check size={22} aria-hidden="true" />
          </div>
          <p className="text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
            You applied to <span className="font-medium text-[color:var(--color-text)]">{job.title}</span>{' '}
            at {job.companyName}. We saved your submission locally as this is a demo — no email is actually sent.
          </p>
        </div>
      ) : (
        <form id="apply-form" onSubmit={submit} className="flex flex-col gap-3 py-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-name" className="text-[13px] font-medium text-[color:var(--color-text)]">
              Full name
            </label>
            <input
              id="apply-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              autoComplete="name"
              className="h-9 rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none focus:border-[color:var(--color-accent)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-email" className="text-[13px] font-medium text-[color:var(--color-text)]">
              Email
            </label>
            <input
              id="apply-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              autoComplete="email"
              className="h-9 rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none focus:border-[color:var(--color-accent)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="apply-note" className="text-[13px] font-medium text-[color:var(--color-text)]">
              Why this role?{' '}
              <span className="text-[color:var(--color-text-subtle)]">(optional)</span>
            </label>
            <textarea
              id="apply-note"
              rows={4}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              placeholder="A short intro helps you stand out…"
              className="rounded-[var(--radius)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none focus:border-[color:var(--color-accent)]"
            />
          </div>
        </form>
      )}
    </Modal>
  );
}
