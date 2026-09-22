// A small olive-branch sprig used as an organic accent in the warm theme.
export default function Sprig({ className = '' }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden>
      <path d="M6 54 C40 40 70 30 116 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {[
        [30, 42, -25],
        [48, 34, -25],
        [66, 27, -25],
        [84, 20, -25],
        [40, 40, 20],
        [58, 32, 20],
        [76, 25, 20],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="9"
          ry="4"
          fill="currentColor"
          opacity="0.9"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
    </svg>
  )
}
