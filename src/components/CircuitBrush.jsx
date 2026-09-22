import { motion, useReducedMotion } from 'framer-motion'

// The visual bridge between the two worlds:
// a precise circuit trace on the left that dissolves into a loose brush stroke on the right.
export default function CircuitBrush({ className = '' }) {
  const reduce = useReducedMotion()

  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 2, ease: 'easeInOut' },
      }

  return (
    <svg
      viewBox="0 0 900 140"
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="cb-grad" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2F6DF6" />
          <stop offset="48%" stopColor="#8A6AC0" />
          <stop offset="100%" stopColor="#C0653B" />
        </linearGradient>
      </defs>

      {/* Circuit half — right angles + solder nodes */}
      <motion.path
        d="M20 70 H120 V40 H200 V100 H280 V70 H360 Q400 70 420 70"
        stroke="url(#cb-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        {...draw}
      />
      {[[120, 40], [200, 100], [280, 70]].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="#2F6DF6"
          initial={reduce ? {} : { scale: 0 }}
          animate={reduce ? {} : { scale: 1 }}
          transition={{ delay: 0.4 + i * 0.25, duration: 0.4 }}
        />
      ))}

      {/* Brush half — flowing organic curve, thicker, tapered */}
      <motion.path
        d="M420 70 Q500 20 560 60 T700 70 Q780 78 880 45"
        stroke="url(#cb-grad)"
        strokeWidth="8"
        strokeLinecap="round"
        {...(reduce
          ? {}
          : {
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1 },
              transition: { duration: 2, ease: 'easeInOut', delay: 0.6 },
            })}
      />
      {/* Paint splash at the brush end */}
      <motion.circle
        cx="880"
        cy="45"
        r="6"
        fill="#C0653B"
        initial={reduce ? {} : { scale: 0 }}
        animate={reduce ? {} : { scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      />
    </svg>
  )
}
