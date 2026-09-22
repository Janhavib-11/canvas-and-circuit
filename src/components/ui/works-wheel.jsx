'use client'

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
//
// Adapted to JSX (from the original TSX) and to this project's warm Creative-
// world Tailwind tokens (art.* / sand) in place of shadcn theme classes.
import * as React from 'react'

import { cn } from '@/lib/utils'

/* Geometry — see original notes. */
const CARD_H = 0.38
const CARD_MAX_W = 0.34
const CARD_RATIO = 1.45
const STEP = 40
const DRUM = 2.22
const LENS = 2.7
const RING_R = 1.14
const BOW = 1.82
const TITLE = 0.124
const INDEX = 0.04
const CULL = 1.6

const WHEEL_UNITS = 900
const DRAG_UNITS = 420
const SETTLE = 140
const EASE = 0.12

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const lerp = (a, b, t) => a + (b - a) * t

const rad = (deg) => (deg * Math.PI) / 180

const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)))

function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  )
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = 'View',
  className,
  ...props
}) {
  const stageRef = React.useRef(null)
  const wheelRef = React.useRef(null)
  const cardRefs = React.useRef([])
  const labelRef = React.useRef(null)
  const titleRef = React.useRef(null)

  const turn = React.useRef(0)
  const target = React.useRef(0)
  const [active, setActive] = React.useState(0)
  const [stage, setStage] = React.useState({ w: 0, h: 0 })

  const count = items.length
  const last = Math.max(count - 1, 0)

  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const metrics = React.useMemo(() => {
    const { w, h } = stage
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W)
    const cardH = cardW / CARD_RATIO
    const drumR = cardH * DRUM
    const ringR = cardH * RING_R
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    }
  }, [stage, count])

  React.useEffect(() => {
    if (!stage.h) return
    let frame = 0
    const { ringR, ringScale, drumR, bow } = metrics

    const draw = () => {
      frame = requestAnimationFrame(draw)
      const gap = target.current - turn.current
      if (Math.abs(gap) < 0.0005) turn.current = target.current
      else turn.current += gap * (reduced ? 1 : EASE)

      const t = turn.current
      const m = clamp(t, 0, 1)
      const pos = Math.max(0, t - 1)

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos
        const drumDeg = d * STEP
        const card = cardRefs.current[i]
        if (card) {
          card.style.transform = place(d * (360 / count), drumDeg, ringR, drumR, bow, m)
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1'
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2))
        }
        const face = card?.firstElementChild
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)
      const near = clamp(Math.round(pos), 0, last)
      setActive((prev) => (prev === near ? prev : near))
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [metrics, stage.h, count, last, reduced])

  const to = React.useCallback(
    (next) => {
      target.current = clamp(next, 0, last + 1)
    },
    [last],
  )

  const drag = React.useRef(null)
  const settling = React.useRef(0)

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (event) => {
      const next = target.current + event.deltaY / WHEEL_UNITS
      if (next > 0 && next < last + 1) event.preventDefault()
      to(next)
      window.clearTimeout(settling.current)
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      window.clearTimeout(settling.current)
    }
  }, [to, last])

  return (
    <section
      aria-label={label}
      className={cn(
        'bg-art-bg text-art-ink relative h-full min-h-[24rem] w-full overflow-hidden select-none',
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-art-ink absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS)
          drag.current = event.clientY
        }}
        onPointerUp={() => {
          drag.current = null
          if (target.current > 1) to(Math.round(target.current))
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') to(Math.round(target.current) + 1)
          else if (event.key === 'ArrowUp') to(Math.round(target.current) - 1)
          else return
          event.preventDefault()
        }}
      >
        <div ref={wheelRef} className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
          {items.map((item, i) => {
            const Tag = item.href ? 'a' : 'div'
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node) => {
                    cardRefs.current[i] = node
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-sand shadow-art-ink/10 relative block size-full overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {action && item.href ? (
                      <span className="bg-art-bg/80 text-art-ink pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center font-display tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[8%] -translate-y-1/2 font-display tracking-tight opacity-0"
        style={{ fontSize: metrics.title }}
      >
        {items[active]?.title}
      </div>

      <ol
        className="text-art-muted absolute top-[7.5%] right-[2.5%] text-right leading-[1.75]"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                'focus-visible:outline-art-ink cursor-pointer transition-colors outline-none focus-visible:outline-1',
                i === active && 'text-art-ink font-medium',
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default WorksWheel
