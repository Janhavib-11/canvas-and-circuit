// Minimal className joiner (shadcn's `cn`). Filters falsy values and flattens.
// Enough for our usage; swap in clsx + tailwind-merge if you need conflict
// resolution between Tailwind classes.
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(' ')
}
