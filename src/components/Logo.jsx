export function Logo({ size = 22 }) {
  return (
    <div className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="pl-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="7" fill="url(#pl-logo-g)" />
        <path
          d="M9 12h14v11.5a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V12Zm3.4-3.2A2.4 2.4 0 0 1 14.8 6.4h2.4a2.4 2.4 0 0 1 2.4 2.4V10h-1.9V8.8a.5.5 0 0 0-.5-.5h-2.4a.5.5 0 0 0-.5.5V10h-1.9V8.8Z"
          fill="#fff"
        />
        <path
          d="M9 15.6c2.2.9 4.6 1.4 7 1.4s4.8-.5 7-1.4v2c-2.2.9-4.6 1.3-7 1.3s-4.8-.4-7-1.3v-2Z"
          fill="#c7d2fe"
          opacity=".95"
        />
      </svg>
      <span className="font-semibold tracking-tight text-[color:var(--color-text)]">
        Postline
      </span>
    </div>
  );
}
