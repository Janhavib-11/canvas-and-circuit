import { useEffect, useRef, useState } from 'react'

// Custom cursor follower — LERP-based inertia (manual rAF, not springs) gives
// smooth trailing lag. Contextual hover/magnetic states: over an interactive
// element the follower snaps to its centre and morphs into a rounded highlight
// hugging it. Disabled on touch devices and for reduced-motion.
const BASE = 32
const EASE = 0.15 // trailing lag on free move
const EASE_SNAP = 0.22 // a touch faster when locking onto a target
const lerp = (a, b, t) => a + (b - a) * t

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fine && !reduce) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let visible = false
    let hoverRect = null // set when magnetically locked to an element

    // current, lerped state
    const cur = { x: mouseX, y: mouseY, w: BASE, h: BASE, r: BASE / 2, o: 0 }

    const findTarget = (t) =>
      t && t.closest ? t.closest('a, button, [role="tab"], [data-cursor="hover"]') : null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      visible = true
      const target = findTarget(e.target)
      hoverRect = target ? target.getBoundingClientRect() : null
    }
    const onLeave = () => {
      visible = false
    }
    const clearHover = () => {
      hoverRect = null
    }

    let raf
    const tick = () => {
      let tx, ty, tw, th, tr, ease
      if (hoverRect) {
        // magnetic: pull to the element's centre and wrap it as a highlight
        tx = hoverRect.left + hoverRect.width / 2
        ty = hoverRect.top + hoverRect.height / 2
        tw = hoverRect.width + 18
        th = hoverRect.height + 14
        tr = 14
        ease = EASE_SNAP
      } else {
        tx = mouseX
        ty = mouseY
        tw = BASE
        th = BASE
        tr = BASE / 2
        ease = EASE
      }
      cur.x = lerp(cur.x, tx, ease)
      cur.y = lerp(cur.y, ty, ease)
      cur.w = lerp(cur.w, tw, ease)
      cur.h = lerp(cur.h, th, ease)
      cur.r = lerp(cur.r, tr, ease)
      cur.o = lerp(cur.o, visible ? 1 : 0, 0.2)

      el.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`
      el.style.width = `${cur.w}px`
      el.style.height = `${cur.h}px`
      el.style.borderRadius = `${cur.r}px`
      el.style.opacity = String(cur.o)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll', clearHover, true)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', clearHover, true)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={ref}
        className="absolute left-0 top-0 border border-brand-accent/60 bg-brand-accent/[0.06] backdrop-blur-[2px]"
        style={{
          width: BASE,
          height: BASE,
          borderRadius: 999,
          opacity: 0,
          willChange: 'transform, width, height, border-radius',
        }}
      />
    </div>
  )
}
