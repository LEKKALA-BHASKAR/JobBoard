import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { JobCard } from '../components/JobCard';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

export default function MyJobsPage() {
  const { jobs, myJobIds, loading } = useJobs();
  const mineSet = useMemo(() => new Set(myJobIds), [myJobIds]);
  const mine = useMemo(
    () =>
      jobs
        .filter((j) => mineSet.has(j.id))
        .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)),
    [jobs, mineSet],
  );

  return (
    <>
      <SEO title="My posts" description="Job listings you've published." />
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
              Your listings
            </p>
            <h1 className="font-display mt-2 text-[40px] font-medium leading-[1.02] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
              My posted <em className="italic">roles.</em>
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--color-text-muted)]">
              Listings you’ve published on Postline. Edit or delete from any listing page.
            </p>
          </div>
          <Link to="/post-job">
            <Button leftIcon={<Plus size={13} aria-hidden="true" />}>Post a job</Button>
          </Link>
        </header>

        {loading ? (
          <p className="text-sm text-[color:var(--color-text-muted)]">Loading…</p>
        ) : mine.length === 0 ? (
          <EmptyState
            icon={<Briefcase size={16} aria-hidden="true" />}
            title="No roles posted yet"
            description="Publish your first role in under 60 seconds. It’s free during the beta."
            action={
              <Link to="/post-job">
                <Button>Post your first role</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mine.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
