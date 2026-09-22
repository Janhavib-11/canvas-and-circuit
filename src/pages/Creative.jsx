import { useState, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import LazyImage from '../components/LazyImage.jsx'
import Lightbox from '../components/Lightbox.jsx'
import WorksWheel from '../components/ui/works-wheel.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { site } from '../data/site.js'
import { artworks, categories } from '../data/artworks.js'

// Feed the wheel with the same artworks (browse-only — the grid below handles opening).
const wheelItems = artworks.map((a) => ({ title: a.title, image: a.image }))

const sections = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

// Quick lookup so the hero collage pulls real pieces (image, title, year, ratio).
const artById = Object.fromEntries(artworks.map((a) => [a.id, a]))

// A scattered gallery-wall collage. Mixed sizes + a few captioned "hero" pieces
// give the editorial, pinned-to-the-wall feel; each drifts on scroll.
const heroFrames = [
  { id: 'portrait-charcoal', top: '13%', left: '3%', w: 168, rot: -5, depth: 60, caption: true },
  { id: 'still-life-fruit', top: '56%', left: '8%', w: 132, rot: 4, depth: 120 },
  { id: 'ceramic-set', top: '33%', left: '21%', w: 92, rot: -9, depth: 190 },
  { id: 'landscape-2', top: '12%', right: '18%', w: 150, rot: 5, depth: 90, caption: true },
  { id: 'type-study', top: '22%', right: '3%', w: 182, rot: -4, depth: 40, caption: true },
  { id: 'figure-study', top: '58%', right: '7%', w: 138, rot: 7, depth: 150 },
]

function HeroFrame({ f, progress }) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : -f.depth])
  const art = artById[f.id]
  if (!art) return null
  return (
    <motion.div
      style={{ y, top: f.top, left: f.left, right: f.right, width: f.w, rotate: f.rot }}
      initial={reduce ? false : { opacity: 0, scale: 0.92, y: 14 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group absolute hidden md:block"
    >
      {/* polaroid / matted print */}
      <div className="overflow-hidden rounded-[2px] border-[6px] border-sand bg-sand shadow-[0_24px_55px_-24px_rgba(56,41,27,0.55)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0">
        <img
          src={art.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="block w-full object-cover"
          style={{ aspectRatio: `1 / ${art.ratio}` }}
        />
      </div>
      {f.caption ? (
        <div className="mt-2 flex items-baseline justify-between gap-2 px-1">
          <span className="font-display text-[12px] italic text-art-ink">{art.title}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-art-muted">
            {art.year}
          </span>
        </div>
      ) : null}
    </motion.div>
  )
}

// Thin scroll-progress bar (scroll-linked), smoothed with a spring.
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left bg-brand-accent"
      aria-hidden
    />
  )
}

// One gallery tile: parallax drift (scroll-linked) + a one-by-one reveal on enter.
function GalleryItem({ a, index, onOpen }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Vary the parallax magnitude per column so the grid gains depth.
  const mag = [64, 26, 46][index % 3]
  const yRaw = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [mag, -mag])
  const y = useSpring(yRaw, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <div ref={ref} className="mb-5 break-inside-avoid">
      <motion.div style={{ y }} className="will-change-transform">
        <motion.button
          onClick={() => onOpen(a.id)}
          initial={reduce ? false : { opacity: 0, y: 60, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.12 }}
          className="group relative block w-full overflow-hidden rounded-sm border border-art-line text-left"
        >
          <LazyImage
            src={a.image}
            alt={a.title}
            ratio={a.ratio}
            imgClassName="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="p-4">
              <p className="font-display text-lg text-white">{a.title}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
                {a.medium} · {a.year}
              </p>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function Creative() {
  useSEO({
    title: 'Creative World — Janhavi Bawankule | Art & Design Gallery',
    description:
      'A curated gallery of paintings, sketches, crafts, graphic design and digital experiments by Janhavi Bawankule.',
    themeColor: '#F4EDE2',
  })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const [active, setActive] = useState('All')
  const [current, setCurrent] = useState(null) // index into filtered list

  const filtered = useMemo(
    () => (active === 'All' ? artworks : artworks.filter((a) => a.category === active)),
    [active],
  )

  const openAt = (id) => setCurrent(filtered.findIndex((a) => a.id === id))
  const close = () => setCurrent(null)
  const prev = () => setCurrent((c) => (c - 1 + filtered.length) % filtered.length)
  const next = () => setCurrent((c) => (c + 1) % filtered.length)

  return (
    <div className="relative min-h-screen bg-art-bg text-art-ink">
      <div className="grain-overlay" />
      <ScrollProgress />
      <Nav world="art" sections={sections} />

      {/* Hero — an editorial gallery-wall collage */}
      <section ref={heroRef} className="relative flex min-h-[94vh] items-center overflow-hidden">
        {/* warm glow + giant faint word for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[48vh] w-[48vh] -translate-x-1/2 -translate-y-[56%] rounded-full bg-brand-accent/10 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-display text-[20vw] leading-none text-art-ink/[0.04] lg:block"
        >
          Gallery
        </span>

        {heroFrames.map((f) => (
          <HeroFrame key={f.id} f={f} progress={scrollYProgress} />
        ))}

        <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rotate-90 select-none label text-art-muted lg:block">
          Selected Works — MMXXVI
        </span>

        <div className="container-page relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 label text-art-accent"
          >
            <span className="h-px w-8 bg-art-accent/50" />
            № 01 · The Creative World
            <span className="h-px w-8 bg-art-accent/50" />
          </motion.p>

          <div className="relative mt-5">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-6xl leading-[1] text-transparent sm:text-8xl"
              style={{ WebkitTextStroke: '1px rgba(193,104,60,0.28)', transform: 'translateY(7px)' }}
            >
              The Canvas
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="relative mx-auto max-w-3xl font-display text-6xl leading-[1] text-art-ink sm:text-8xl"
            >
              The Canvas
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-2 font-script text-3xl text-brand-accent sm:text-4xl"
          >
            a living gallery
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mx-auto mt-5 max-w-md text-art-muted"
          >
            Every piece here has a story — paintings, sketches, crafts and experiments made when
            intuition leads instead of logic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault()
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                document
                  .getElementById('gallery')
                  ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
              }}
              className="rounded-full bg-art-ink px-7 py-3 text-sm font-medium text-art-bg transition-transform hover:scale-[1.03]"
            >
              Browse the gallery
            </a>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault()
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                document
                  .getElementById('process')
                  ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
              }}
              className="border-b border-art-ink/40 pb-1 text-sm text-art-ink transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              The process →
            </a>
          </motion.div>
        </div>

        {/* mediums index along the bottom */}
        <div className="absolute inset-x-0 bottom-6 z-10 hidden items-center justify-center gap-4 label text-art-muted md:flex">
          {['Paintings', 'Sketches', 'Crafts', 'Graphic Design', 'Digital'].map((m, i) => (
            <span key={m} className="flex items-center gap-4">
              {i > 0 && <span className="text-art-accent/60">✦</span>}
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* Selected works — the turnable wheel */}
      <section className="relative">
        <div className="container-page pt-24 pb-4">
          <SectionHeading
            world="art"
            eyebrow="Selected works"
            title="Turn the wheel"
            intro="Scroll or drag to spin through the collection — the full grid is just below."
          />
        </div>
        <div className="h-[82vh] w-full">
          <WorksWheel items={wheelItems} label="Works '26" action="View" />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="container-page py-20">
        <SectionHeading world="art" eyebrow="Gallery" title="The art that defines me" intro="Filter by medium — click any piece to view it full-frame with its story." />

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                active === c
                  ? 'border-art-accent bg-art-accent text-white'
                  : 'border-art-line text-art-muted hover:border-art-ink hover:text-art-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry via CSS columns — each tile parallaxes + reveals one by one */}
        <div className="mt-10 [column-fill:_balance] gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((a, i) => (
            <GalleryItem key={a.id} a={a} index={i} onOpen={openAt} />
          ))}
        </div>
      </section>

      {/* Process / behind the work */}
      <section id="process" className="container-page py-20">
        <SectionHeading world="art" eyebrow="Behind the work" title="Concept to canvas" intro="How a piece usually comes together." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['01', 'Spark', 'A colour, a signal, a shape I can’t stop thinking about.'],
            ['02', 'Study', 'Small thumbnails and swatches to test the idea quickly.'],
            ['03', 'Build', 'Layering medium — patient where it matters, loose where it counts.'],
            ['04', 'Finish', 'Step back, resolve edges, and know when to stop.'],
          ].map(([n, t, d]) => (
            <Reveal key={n} className="rounded-2xl border border-art-line bg-art-surface p-6">
              <p className="font-display text-3xl text-art-accent">{n}</p>
              <p className="mt-3 font-medium text-art-ink">{t}</p>
              <p className="mt-2 text-sm text-art-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer world="art" />

      <Lightbox
        item={current === null ? null : filtered[current]}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </div>
  )
}
