import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Liquid cursor: a crisp dot leads, and two soft, transparent blurred blobs
// trail behind it with different spring lags — a gooey, liquid wake.
// Auto-disabled on touch devices and when the user prefers reduced motion.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Two trailing layers, softer springs = more lag = more "liquid".
  const blobX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.5 })
  const blobY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.5 })
  const tailX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.8 })
  const tailY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.8 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const t = e.target
      setHovering(!!(t.closest && t.closest('a, button, [role="tab"], [data-cursor="hover"]')))
    }
    const leave = () => setHidden(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* trailing tail — soft transparent terracotta wake */}
      <motion.div
        className="absolute rounded-full bg-brand-accent/20 blur-2xl"
        style={{
          x: tailX,
          y: tailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{ width: hovering ? 160 : 100, height: hovering ? 160 : 100 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
      {/* liquid-glass lens — transparent, frosted, refracts what's behind it */}
      <motion.div
        className="absolute rounded-full border border-white/30 bg-white/5 shadow-[inset_0_1px_6px_rgba(255,255,255,0.35),0_6px_20px_-8px_rgba(56,41,27,0.35)] backdrop-blur-[3px]"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{ width: hovering ? 64 : 40, height: hovering ? 64 : 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
      {/* crisp dot — leads exactly at the pointer */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-brand-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: hidden ? 0 : 1 }}
      />
    </div>
  )
}
