import { useState } from 'react';
import { cn } from '../utils/cn';
import { colorFromString, initials } from '../utils/format';

// Company logo with graceful fallback. If the logo URL fails or is missing,
// falls back to a solid initials avatar tinted from the company's own color
// (or a deterministic hash of the name).
export function LogoAvatar({ name, src, brandColor, size = 40, className, rounded = 'md' }) {
  const [failed, setFailed] = useState(false);
  const dim = { width: size, height: size };
  const bg = brandColor || colorFromString(name || '');
  const radii = {
    sm: 'rounded-md',
    md: 'rounded-[10px]',
    lg: 'rounded-[14px]',
    full: 'rounded-full',
  };

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        style={{ ...dim, backgroundColor: bg }}
        className={cn(
          'flex shrink-0 items-center justify-center text-white',
          radii[rounded],
          className,
        )}
      >
        <span
          className="font-semibold tracking-tight"
          style={{ fontSize: Math.max(11, size * 0.42) }}
        >
          {initials(name)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      decoding="async"
      style={dim}
      onError={() => setFailed(true)}
      className={cn(
        'shrink-0 bg-white object-contain p-1 ring-1 ring-[color:var(--color-border)]',
        radii[rounded],
        className,
      )}
    />
  );
}
