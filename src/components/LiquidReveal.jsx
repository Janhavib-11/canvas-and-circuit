import { useEffect, useRef } from 'react'

// Liquid image reveal — a canvas brush that follows the pointer and paints a
// full-colour copy of the image over a muted base, with soft radial stamps and
// a decay fade (ported from the reference hero effect). Reduced-motion just
// shows the base image. The reveal is driven by window pointermove, so the
// canvas itself stays pointer-events-none.
export default function LiquidReveal({
  src,
  alt = '',
  className = '',
  objectPosition = 'center top',
  // Base stays in original colour (just gently muted); the brush reveals a
  // brighter, more saturated version — a subtle liquid pop, never B/W.
  baseFilter = 'saturate(0.82) contrast(1.02) brightness(0.97)',
  revealFilter = 'saturate(1.28) contrast(1.06) brightness(1.06)',
  brushRadius = 143,
  decay = 0.016,
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    const cover = document.createElement('canvas')
    const cctx = cover.getContext('2d')
    const brush = document.createElement('canvas')
    const bctx = brush.getContext('2d')

    const after = new Image()
    after.crossOrigin = 'anonymous'
    after.src = src

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const radius = brushRadius * dpr
    const diam = Math.ceil(radius * 2)
    const anchorTop = /top/.test(objectPosition)
    const points = []
    let last = null
    let idle = 121
    let rect
    let raf

    const drawCover = () => {
      if (!after.complete || !after.naturalWidth) return
      const s = Math.max(cover.width / after.naturalWidth, cover.height / after.naturalHeight)
      const w = after.naturalWidth * s
      const h = after.naturalHeight * s
      const x = (cover.width - w) / 2
      const y = anchorTop ? 0 : (cover.height - h) / 2
      cctx.clearRect(0, 0, cover.width, cover.height)
      cctx.drawImage(after, x, y, w, h)
    }

    const resize = () => {
      rect = wrap.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      cover.width = canvas.width
      cover.height = canvas.height
      brush.width = brush.height = diam
      drawCover()
    }

    after.onload = drawCover
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    const onMove = (e) => {
      rect = wrap.getBoundingClientRect()
      const x = (e.clientX - rect.left) * dpr
      const y = (e.clientY - rect.top) * dpr
      if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) {
        last = null
        return
      }
      if (!last) {
        points.push([x, y])
        last = { x, y }
        return
      }
      const dx = x - last.x
      const dy = y - last.y
      const dist = Math.hypot(dx, dy)
      const step = Math.max(radius * 0.3, 1)
      const n = Math.min(Math.ceil(dist / step), 60)
      for (let i = 1; i <= n; i++) points.push([last.x + (dx * i) / n, last.y + (dy * i) / n])
      last = { x, y }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const stamp = (x, y) => {
      bctx.clearRect(0, 0, diam, diam)
      bctx.globalCompositeOperation = 'source-over'
      const g = bctx.createRadialGradient(radius, radius, 0, radius, radius, radius)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.55, 'rgba(255,255,255,.82)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      bctx.fillStyle = g
      bctx.fillRect(0, 0, diam, diam)
      bctx.globalCompositeOperation = 'source-in'
      bctx.drawImage(cover, x - radius, y - radius, diam, diam, 0, 0, diam, diam)
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(brush, x - radius, y - radius)
    }

    const tick = () => {
      const drawing = points.length > 0
      if (drawing) idle = 0
      else idle++
      if (idle <= 120) {
        const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = `rgba(0,0,0,${fade})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (drawing) points.splice(0).forEach((p) => stamp(p[0], p[1]))
        if (idle === 120) ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
    }
  }, [src, objectPosition, brushRadius, decay])

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition, filter: baseFilter }}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ filter: revealFilter }}
        aria-hidden
      />
    </div>
  )
}
