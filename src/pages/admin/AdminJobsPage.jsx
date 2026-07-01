import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Pencil, Search, Star, Trash2 } from 'lucide-react';
import { useJobs } from '../../context/JobsContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/Badge';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { formatRelative } from '../../utils/format';

export default function AdminJobsPage() {
  const { jobs, updateJob, deleteJob } = useJobs();
  const toast = useToast();

  const [query, setQuery] = useState('');
  const [confirmDel, setConfirmDel] = useState(null); // {id, title}
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...jobs].sort(
      (a, b) => new Date(b.postedAt) - new Date(a.postedAt),
    );
    if (!q) return list;
    return list.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        (j.location || '').toLowerCase().includes(q),
    );
  }, [jobs, query]);

  const toggleFeatured = async (job) => {
    try {
      await updateJob(job.id, { featured: !job.featured });
      toast.success(job.featured ? 'Removed from featured.' : 'Marked as featured.');
    } catch {
      toast.error('Could not update job.');
    }
  };

  const doDelete = async () => {
    if (!confirmDel) return;
    setBusy(true);
    try {
      await deleteJob(confirmDel.id);
      toast.success('Job deleted.');
      setConfirmDel(null);
    } catch {
      toast.error('Delete failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
            Jobs
          </p>
          <h1 className="font-display mt-3 text-[36px] font-medium leading-[1.02] tracking-[-0.02em] text-[color:var(--color-text)]">
            Manage <em className="italic">postings.</em>
          </h1>
          <p className="mt-1 text-[13px] text-[color:var(--color-text-muted)]">
            {jobs.length} total · {jobs.filter((j) => j.featured).length} featured
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Input
            leftIcon={<Search size={14} aria-hidden="true" />}
            placeholder="Search title, company, location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <div className="hidden grid-cols-[1.6fr_1fr_.8fr_.7fr_auto] gap-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-2.5 text-[11.5px] font-medium uppercase tracking-wider text-[color:var(--color-text-subtle)] md:grid">
          <span>Title</span>
          <span>Company</span>
          <span>Category</span>
          <span>Posted</span>
          <span className="text-right">Actions</span>
        </div>
        <ul>
          {filtered.map((j) => (
            <li
              key={j.id}
              className="grid grid-cols-1 gap-2 border-b border-[color:var(--color-border)] px-4 py-3 last:border-b-0 md:grid-cols-[1.6fr_1fr_.8fr_.7fr_auto] md:items-center md:gap-3"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/jobs/${j.id}`}
                    className="truncate text-[14px] font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-secondary)]"
                  >
                    {j.title}
                  </Link>
                  {j.featured && <Badge variant="accent">Featured</Badge>}
                  {j.isCustom && <Badge variant="outline">User</Badge>}
                </div>
                <div className="mt-0.5 truncate text-[12px] text-[color:var(--color-text-subtle)] md:hidden">
                  {j.company} · {j.location}
                </div>
              </div>
              <div className="hidden truncate text-[13px] text-[color:var(--color-text-muted)] md:block">
                {j.company}
              </div>
              <div className="hidden text-[13px] text-[color:var(--color-text-muted)] md:block">
                {j.category}
              </div>
              <div className="hidden text-[12.5px] text-[color:var(--color-text-subtle)] md:block">
                {formatRelative(j.postedAt)}
              </div>
              <div className="flex items-center gap-1 md:justify-end">
                <button
                  type="button"
                  onClick={() => toggleFeatured(j)}
                  aria-label={j.featured ? 'Unfeature' : 'Feature'}
                  title={j.featured ? 'Unfeature' : 'Feature'}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] transition ${
                    j.featured
                      ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
                      : 'text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]'
                  }`}
                >
                  <Star
                    size={14}
                    aria-hidden="true"
                    fill={j.featured ? 'currentColor' : 'none'}
                  />
                </button>
                <Link
                  to={`/edit-job/${j.id}`}
                  aria-label="Edit"
                  title="Edit"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]"
                >
                  <Pencil size={14} aria-hidden="true" />
                </Link>
                <Link
                  to={`/jobs/${j.id}`}
                  aria-label="View"
                  title="View"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setConfirmDel({ id: j.id, title: j.title })}
                  aria-label="Delete"
                  title="Delete"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-[color:var(--color-danger)] transition hover:bg-[color:var(--color-danger-soft)]"
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
          {!filtered.length && (
            <li className="px-4 py-10 text-center text-[13px] text-[color:var(--color-text-subtle)]">
              No matching jobs.
            </li>
          )}
        </ul>
      </div>

      <Modal
        open={Boolean(confirmDel)}
        onClose={() => (busy ? null : setConfirmDel(null))}
        title="Delete job?"
      >
        <p className="text-[14px] text-[color:var(--color-text-muted)]">
          Delete <strong className="text-[color:var(--color-text)]">{confirmDel?.title}</strong>?
          This is permanent and also removes it from bookmarks.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDel(null)} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={doDelete} loading={busy}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
