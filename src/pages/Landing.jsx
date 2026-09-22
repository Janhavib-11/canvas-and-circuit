import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import CircuitBrush from '../components/CircuitBrush.jsx'
import Marquee from '../components/Marquee.jsx'
import Sprig from '../components/Sprig.jsx'
import CharacterSwitcherCard from '../components/ui/character-switcher.jsx'
import { site } from '../data/site.js'
import { useSEO } from '../hooks/useSEO.js'

/* ---------- shared bits ---------- */

function ScrollCue() {
  const reduce = useReducedMotion()
  return (
    <div className="flex items-center gap-3">
      <span className="label text-art-muted">Scroll</span>
      <div className="relative h-9 w-[18px] rounded-full border border-art-muted/50">
        <motion.span
          className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-accent"
          animate={reduce ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

// Warm world portals — Technical reads olive/structured, Creative reads terracotta.
function WarmPortal({ to, kind, title, subtitle, points }) {
  const isTech = kind === 'tech'
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative"
    >
      <Link
        to={to}
        className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:p-10 ${
          isTech ? 'bg-olive text-sand' : 'bg-brand-accent text-white'
        }`}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-20"
          style={{ background: isTech ? '#EFE6D8' : '#38291B' }}
        />
        <div className="relative">
          <p className="label opacity-80">Enter the</p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl">{title}</h3>
          <p className="mt-3 max-w-xs text-sm opacity-90">{subtitle}</p>
        </div>
        <div className="relative mt-10 flex items-end justify-between">
          <ul className="space-y-1.5 label opacity-80">
            {points.map((p) => (
              <li key={p}>— {p}</li>
            ))}
          </ul>
          <span
            className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-lg backdrop-blur transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

/* ---------- page ---------- */

export default function Landing() {
  const reduce = useReducedMotion()
  useSEO({
    title: 'Canvas & Circuit — Janhavi Bawankule | Engineer & Creator',
    description:
      'Engineer by discipline. Creator by passion. A dual-identity portfolio — choose the Technical World or the Creative World.',
    themeColor: '#F4EDE2',
  })

  const scrollerRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    container: scrollerRef,
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50])

  const ease = [0.22, 1, 0.36, 1]
  const vp = { once: true, amount: 0.3, root: scrollerRef }

  return (
    <main
      ref={scrollerRef}
      className="hero-scroller h-screen snap-y snap-proximity overflow-y-auto overflow-x-hidden bg-art-bg text-art-ink"
    >
      {/* minimal top bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="pointer-events-auto font-display text-lg text-art-ink">
            <span className="font-semibold">Canvas</span>
            <span className="text-brand-accent"> &amp; </span>
            <span className="italic">Circuit</span>
          </Link>
          <div className="pointer-events-auto hidden items-center gap-5 sm:flex">
            <Link to="/technical" className="label text-art-muted hover:text-art-ink">
              Technical
            </Link>
            <Link to="/creative" className="label text-art-muted hover:text-art-ink">
              Creative
            </Link>
          </div>
        </div>
      </div>

      {/* ===================== PANEL 1 — ZARA-style full-bleed editorial hero ===================== */}
      <section
        ref={heroRef}
        className="relative min-h-screen snap-start overflow-hidden bg-art-bg"
      >
        {/* portrait — anchored right at a portrait-friendly width so the full
            upper body reads instead of a hard face crop; blends into the cream */}
        <motion.div
          style={{ y: portraitY }}
          initial={reduce ? false : { scale: 1.03, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-y-0 right-0 w-full lg:w-[52%]"
        >
          <img
            src="/images/portrait.webp"
            alt="Janhavi Bawankule"
            className="h-full w-full object-cover object-[center_top]"
            style={{ filter: 'sepia(0.14) contrast(1.03) brightness(1.02) saturate(0.92)' }}
          />
          {/* blend the photo's left edge into the cream */}
          <div className="absolute inset-0 bg-gradient-to-r from-art-bg via-art-bg/40 to-transparent lg:via-art-bg/15" />
          {/* soft top / bottom fades */}
          <div className="absolute inset-0 bg-gradient-to-t from-art-bg via-transparent to-transparent" />
          <div className="absolute inset-0 mix-blend-multiply bg-brand-accent/5" />
        </motion.div>

        {/* giant faint monogram, far right */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[22rem] leading-none text-art-ink/5 lg:block"
        >
          J
        </span>

        {/* vertical edition label, right edge */}
        <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 select-none label text-art-muted lg:block">
          Canvas &amp; Circuit — Vol. 01 · 2026
        </span>

        {/* content */}
        <div className="container-page relative z-10 flex min-h-screen flex-col justify-center pb-24 pt-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span className="h-8 w-px bg-brand-accent" />
            <span className="label leading-tight text-art-ink">
              Portfolio — Vol. 01
              <br />
              Electronics &amp; Telecom · Visual Art
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="mt-6 font-display leading-[0.82] tracking-tight text-art-ink"
          >
            <span className="block text-[4.2rem] font-medium sm:text-8xl lg:text-[9rem]">
              Janhavi
            </span>
            <span className="mt-2 block text-2xl uppercase tracking-[0.42em] text-brand-accent sm:text-3xl">
              Bawankule
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.28 }}
            className="mt-7 max-w-md font-display text-xl italic text-art-ink/90 sm:text-2xl"
          >
            Engineer by discipline. Creator by passion.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <Link
              to="/technical"
              className="inline-flex items-center gap-2 rounded-none bg-art-ink px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-art-bg transition-colors hover:bg-brand-accent"
            >
              Explore my work <span aria-hidden>→</span>
            </Link>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-art-ink/40 pb-1 text-sm uppercase tracking-[0.14em] text-art-ink transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              View résumé
            </a>
          </motion.div>
        </div>

        {/* thin editorial nav strip, ZARA style */}
        <motion.nav
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="absolute inset-x-0 bottom-0 z-10 border-t border-art-ink/15 bg-art-bg/40 backdrop-blur-sm"
        >
          <div className="container-page grid grid-cols-2 divide-x divide-art-ink/10 sm:grid-cols-4">
            {[
              ['Technical World', '/technical'],
              ['Creative World', '/creative'],
              ['Résumé', site.resumeUrl],
              ['Contact', '/technical#contact'],
            ].map(([label, to], i) => {
              const cls = `px-3 py-4 text-center label text-art-ink transition-colors hover:text-brand-accent ${
                i >= 2 ? 'hidden sm:block' : ''
              }`
              // The résumé is a real file — open it, don't route to it.
              return to.endsWith('.pdf') ? (
                <a key={label} href={to} target="_blank" rel="noreferrer" className={cls}>
                  {label}
                </a>
              ) : (
                <Link key={label} to={to} className={cls}>
                  {label}
                </Link>
              )
            })}
          </div>
        </motion.nav>
      </section>

      {/* ===================== PANEL 2 — statement + bridge ===================== */}
      <section className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden bg-sand">
        <div
          className="pointer-events-none absolute -left-20 top-16 h-72 w-72 bg-brand-accent/10"
          style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
        />
        <div className="container-page text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7 }}
            className="label text-clay"
          >
            — The idea —
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.9, ease }}
            className="mx-auto mt-5 max-w-4xl font-display text-3xl leading-[1.15] text-art-ink sm:text-5xl"
          >
            Technology and creativity aren’t separate identities —{' '}
            <span className="font-script text-4xl text-brand-accent sm:text-6xl">
              they’re two sides of the same person.
            </span>
          </motion.h2>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto mt-12 w-full max-w-3xl"
          >
            <CircuitBrush className="h-auto w-full" />
          </motion.div>

          <p className="mt-10 label text-art-muted">Keep scrolling — choose a world</p>
        </div>
      </section>

      {/* ===================== PANEL 3 — the two worlds ===================== */}
      <section className="relative flex min-h-screen snap-start flex-col justify-center overflow-hidden py-24">
        <Sprig className="pointer-events-none absolute right-8 top-16 w-28 text-olive/50 rotate-[200deg]" />
        <div className="container-page">
          <div className="mb-12 grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <p className="label text-clay">— Two worlds —</p>
              <h2 className="mt-3 font-display text-3xl text-art-ink sm:text-5xl">
                Pick where to begin.
              </h2>
              <p className="mt-3 text-art-muted">
                Same person, two visual languages — and a few more sides besides. Tap the card to
                meet them, then jump into a world below.
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="flex justify-center lg:justify-end"
            >
              <CharacterSwitcherCard autoPlay />
            </motion.div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease }}
            >
              <WarmPortal
                to="/technical"
                kind="tech"
                title="Technical World"
                subtitle="Engineering projects, skills, internships, certifications and résumé."
                points={['Projects', 'Skills', 'Résumé']}
              />
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              <WarmPortal
                to="/creative"
                kind="art"
                title="Creative World"
                subtitle="A gallery of paintings, sketches, crafts, graphic design and experiments."
                points={['Gallery', 'Process', 'Craft']}
              />
            </motion.div>
          </div>

          <div className="mt-14 border-y border-art-line py-3">
            <Marquee
              duration={24}
              reverse
              separator="✦"
              itemClassName="font-display text-2xl sm:text-3xl text-olive/40"
              items={['Paintings', 'Circuits', 'Sketches', 'Signals', 'Crafts', 'Code', 'Colour', 'Logic']}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
