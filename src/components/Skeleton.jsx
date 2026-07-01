import { cn } from '../utils/cn';

export function Skeleton({ className, style }) {
  return (
    <div
      style={style}
      className={cn(
        'animate-pulse rounded-[var(--radius-sm)] bg-[color:var(--color-surface-3)]',
        className,
      )}
    />
  );
}

export function JobCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-[10px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}
