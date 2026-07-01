import { Bookmark } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';

export function BookmarkButton({ jobId, jobTitle, className, size = 16 }) {
  const { isBookmarked, toggleBookmark } = useJobs();
  const toast = useToast();
  const bookmarked = isBookmarked(jobId);

  const onClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowBookmarked = await toggleBookmark(jobId);
    toast.success(
      nowBookmarked
        ? `Saved${jobTitle ? ` "${jobTitle}"` : ''} to your bookmarks`
        : 'Removed from bookmarks',
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border transition-colors',
        bookmarked
          ? 'border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-text)]'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:border-[color:var(--color-border-strong)] hover:text-[color:var(--color-text)]',
        className,
      )}
    >
      <Bookmark
        size={size}
        strokeWidth={2}
        aria-hidden="true"
        fill={bookmarked ? 'currentColor' : 'none'}
      />
    </button>
  );
}
