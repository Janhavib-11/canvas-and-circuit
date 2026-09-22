import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

// Segmented toggle that morphs the site between the two worlds.
// `world` is the currently active world: 'tech' | 'art'.
export default function WorldSwitch({ world }) {
  const navigate = useNavigate()
  const location = useLocation()

  const go = (path) => {
    if (location.pathname !== path) navigate(path)
  }

  const options = [
    { key: 'tech', label: 'Technical', path: '/technical' },
    { key: 'art', label: 'Creative', path: '/creative' },
  ]

  const isArt = world === 'art'

  return (
    <div
      role="tablist"
      aria-label="Switch world"
      className={`relative flex items-center rounded-full border p-1 text-xs ${
        isArt ? 'border-art-line bg-art-surface/70' : 'border-tech-line bg-white'
      }`}
    >
      {options.map((o) => {
        const active = o.key === world
        return (
          <button
            key={o.key}
            role="tab"
            aria-selected={active}
            onClick={() => go(o.path)}
            className={`relative z-10 rounded-full px-3.5 py-1.5 font-mono uppercase tracking-[0.12em] transition-colors ${
              active
                ? isArt
                  ? 'text-art-bg'
                  : 'text-white'
                : isArt
                  ? 'text-art-muted hover:text-art-ink'
                  : 'text-tech-muted hover:text-tech-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId="world-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: isArt ? '#C0653B' : '#2F6DF6' }}
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
