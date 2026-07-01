export function RouteFallback() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--color-border-strong)] border-t-[color:var(--color-accent)]"
      />
      <span className="text-[13px] text-[color:var(--color-text-muted)]">Loading…</span>
    </div>
  );
}
