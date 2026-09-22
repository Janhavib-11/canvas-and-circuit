import { useState, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import LazyImage from '../components/LazyImage.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Contact from '../components/Contact.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { site } from '../data/site.js'
import { artworks, categories } from '../data/artworks.js'

const sections = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

// Floating frames that drift on scroll — the artspace-style hero.
const heroFrames = [
  { seed: 'veil', top: '12%', left: '4%', w: 150, rot: -6, depth: 60 },
  { seed: 'stilllife', top: '52%', left: '10%', w: 120, rot: 4, depth: 120 },
  { seed: 'ochre', top: '18%', right: '20%', w: 130, rot: 5, depth: 90 },
  { seed: 'weather', top: '20%', right: '4%', w: 160, rot: -4, depth: 40 },
  { seed: 'figure', top: '58%', right: '8%', w: 120, rot: 6, depth: 150 },
]

function HeroFrame({ f, progress }) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : -f.depth])
  return (
    <motion.div
      style={{
        y,
        top: f.top,
        left: f.left,
        right: f.right,
        width: f.w,
        rotate: f.rot,
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden overflow-hidden rounded-sm border border-art-line shadow-2xl shadow-black/50 md:block"
    >
      <img
        src={`https://picsum.photos/seed/${f.seed}/400/520`}
        alt=""
        aria-hidden
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </motion.div>
  )
}

export default function Creative() {
  useSEO({
    title: 'Creative World — Janhavi Bawankule | Art & Design Gallery',
    description:
      'A curated gallery of paintings, sketches, crafts, graphic design and digital experiments by Janhavi Bawankule.',
    themeColor: '#0B0A08',
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
      <Nav world="art" sections={sections} />

      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[92vh] items-center overflow-hidden">
        {heroFrames.map((f) => (
          <HeroFrame key={f.seed} f={f} progress={scrollYProgress} />
        ))}
        <div className="container-page relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="label text-art-accent"
          >
            Creative World
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-[1.02] sm:text-7xl"
          >
            The Canvas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-6 max-w-md text-art-muted"
          >
            Every piece here has a story — paintings, sketches, crafts and experiments made when
            intuition leads instead of logic.
          </motion.p>
          <motion.a
            href="#gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 inline-block rounded-full bg-art-ink px-7 py-3 text-sm font-medium text-art-bg transition-transform hover:scale-[1.03]"
          >
            Browse the gallery
          </motion.a>
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

        {/* Masonry via CSS columns */}
        <div className="mt-10 [column-fill:_balance] gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((a) => (
            <Reveal key={a.id} className="mb-5 break-inside-avoid">
              <button
                onClick={() => openAt(a.id)}
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
              </button>
            </Reveal>
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

      <Contact world="art" />
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
