import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import CircuitBrush from '../components/CircuitBrush.jsx'
import Marquee from '../components/Marquee.jsx'
import Sprig from '../components/Sprig.jsx'
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

      {/* ===================== PANEL 1 — warm editorial hero ===================== */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen snap-start items-center overflow-hidden"
      >
        {/* organic terracotta blob top-right */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] bg-brand-accent/90"
          style={{ borderRadius: '46% 54% 42% 58% / 55% 45% 55% 45%' }}
        />
        <div
          className="pointer-events-none absolute right-40 top-10 h-40 w-40 rounded-full bg-sand"
          style={{ mixBlendMode: 'multiply' }}
        />
        <Sprig className="pointer-events-none absolute left-6 top-28 w-28 text-olive/70 -rotate-12" />
        <Sprig className="pointer-events-none absolute bottom-28 right-10 hidden w-24 text-olive/60 rotate-[160deg] lg:block" />

        <div className="container-page relative grid w-full items-center gap-8 py-24 lg:grid-cols-12 lg:py-16">
          {/* left — type block */}
          <div className="relative z-20 lg:col-span-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="label text-clay"
            >
              Engineer · Artist — Portfolio Vol. 01
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-4 font-display font-semibold uppercase leading-[0.82] tracking-tight text-brand-accent"
            >
              <span className="block text-6xl sm:text-8xl lg:text-[8.5rem]">Janhavi</span>
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-1 font-display text-2xl uppercase tracking-[0.5em] text-olive sm:text-3xl"
            >
              Portfolio
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-6 font-script text-4xl leading-[1.05] text-art-ink sm:text-5xl"
            >
              Building with circuits,
              <br />
              creating with colour
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-5 max-w-md text-base leading-relaxed text-art-muted"
            >
              Electronics &amp; Telecommunication engineer and visual artist — {site.tagline}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/technical"
                className="rounded-full bg-olive px-6 py-3 text-sm font-medium text-sand transition-transform hover:scale-[1.03]"
              >
                Explore my work
              </Link>
              <a
                href={site.resumeUrl}
                className="rounded-full border border-art-ink/30 px-6 py-3 text-sm text-art-ink transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                View résumé
              </a>
            </motion.div>

            <div className="mt-10 hidden sm:block">
              <ScrollCue />
            </div>
          </div>

          {/* right — portrait in an arch, MARÍA style */}
          <div className="relative lg:col-span-5">
            <motion.figure
              style={{ y: portraitY }}
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="relative z-10 mx-auto w-[72%] max-w-xs sm:max-w-sm lg:w-[92%]"
            >
              <div
                className="relative overflow-hidden border-[6px] border-sand shadow-2xl shadow-clay/30"
                style={{ borderRadius: '48% 48% 46% 46% / 16% 16% 8% 8%' }}
              >
                <img
                  src="/images/portrait.webp"
                  alt="Janhavi Bawankule"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-brand-accent/20" />
              </div>

              {/* rotating seal badge */}
              <motion.div
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-6 bottom-6 h-28 w-28 sm:-left-10"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <path id="seal" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                  </defs>
                  <text className="fill-olive font-mono text-[9px] uppercase tracking-[0.18em]">
                    <textPath href="#seal">
                      · Engineer · Artist · Maker · Creator ·
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 grid place-items-center text-brand-accent">✦</span>
              </motion.div>
            </motion.figure>
          </div>
        </div>

        {/* wavy divider + ribbon at the bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-16 w-full text-olive">
            <path
              d="M0,50 C240,10 480,80 720,50 C960,20 1200,80 1440,40 L1440,90 L0,90 Z"
              fill="currentColor"
            />
          </svg>
          <div className="bg-olive">
            <Marquee
              duration={30}
              itemClassName="font-display text-sm uppercase tracking-[0.18em] text-sand"
              items={[
                'Canvas & Circuit',
                'Engineer by discipline',
                'Creator by passion',
                'Where engineering meets imagination',
              ]}
            />
          </div>
        </div>
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
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7 }}
            className="mb-10 max-w-xl"
          >
            <p className="label text-clay">— Two worlds —</p>
            <h2 className="mt-3 font-display text-3xl text-art-ink sm:text-5xl">
              Pick where to begin.
            </h2>
            <p className="mt-3 text-art-muted">
              Same person, two visual languages. Jump between them anytime.
            </p>
          </motion.div>

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
