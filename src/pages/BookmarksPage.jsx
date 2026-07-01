import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { JobCard } from '../components/JobCard';
import { JobCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

export default function BookmarksPage() {
  const { jobs, bookmarks, loading } = useJobs();
  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);
  const saved = useMemo(
    () => jobs.filter((j) => bookmarkSet.has(j.id)),
    [jobs, bookmarkSet],
  );

  return (
    <>
      <SEO title="Bookmarks" description="The roles you've saved." />
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <header className="mb-8 flex flex-col gap-1">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
            Your library
          </p>
          <h1 className="font-display mt-2 text-[40px] font-medium leading-[1.02] tracking-[-0.02em] text-[color:var(--color-text)] sm:text-[52px]">
            Bookmarked <em className="italic">roles.</em>
          </h1>
          <p className="text-[14px] text-[color:var(--color-text-muted)]">
            {loading
              ? 'Loading your saved roles…'
              : `${saved.length} saved ${saved.length === 1 ? 'role' : 'roles'}`}
          </p>
        </header>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : saved.length === 0 ? (
          <EmptyState
            icon={<Bookmark size={16} aria-hidden="true" />}
            title="No bookmarks yet"
            description="Save a role by tapping the bookmark icon on any card or role page. Your bookmarks are stored locally."
            action={
              <Link to="/jobs">
                <Button>Browse open roles</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {saved.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
