import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import CircuitBrush from '../components/CircuitBrush.jsx'
import { site } from '../data/site.js'
import { useSEO } from '../hooks/useSEO.js'

function Portal({ to, kind, title, subtitle, points }) {
  const isTech = kind === 'tech'
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative"
    >
      <Link
        to={to}
        className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-8 sm:p-10 ${
          isTech
            ? 'border-tech-line bg-gradient-to-br from-white to-tech-bg text-tech-ink'
            : 'border-art-line bg-gradient-to-br from-art-surface to-art-bg text-art-ink'
        }`}
      >
        {/* Texture layer */}
        {isTech ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'linear-gradient(#D7DCE3 1px, transparent 1px), linear-gradient(90deg, #D7DCE3 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(circle at 70% 30%, black, transparent 75%)',
            }}
          />
        ) : (
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-art-accent/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
        )}

        <div className="relative">
          <p className={`label ${isTech ? 'text-tech-accent' : 'text-art-accent'}`}>
            {isTech ? 'Enter the' : 'Enter the'}
          </p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl">{title}</h3>
          <p className={`mt-3 max-w-xs text-sm ${isTech ? 'text-tech-muted' : 'text-art-muted'}`}>
            {subtitle}
          </p>
        </div>

        <div className="relative mt-10 flex items-end justify-between">
          <ul className={`space-y-1.5 label ${isTech ? 'text-tech-muted' : 'text-art-muted'}`}>
            {points.map((p) => (
              <li key={p}>— {p}</li>
            ))}
          </ul>
          <span
            className={`grid h-11 w-11 place-items-center rounded-full text-lg transition-transform duration-300 group-hover:translate-x-1 ${
              isTech ? 'bg-tech-accent text-white' : 'bg-art-accent text-white'
            }`}
            aria-hidden
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Landing() {
  const reduce = useReducedMotion()
  useSEO({
    title: 'Canvas & Circuit — Janhavi Bawankule | Engineer & Creator',
    description:
      'Engineer by discipline. Creator by passion. A dual-identity portfolio — choose the Technical World or the Creative World.',
    themeColor: '#0B0A08',
  })

  return (
    <main className="relative min-h-screen bg-art-bg text-art-ink">
      <div className="grain-overlay" />

      {/* ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-tech-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-40 h-96 w-96 translate-x-1/2 rounded-full bg-art-accent/10 blur-3xl" />

      <section className="container-page relative flex min-h-screen flex-col justify-center py-24">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label text-art-accent"
        >
          {site.brand} · {site.concept}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          I build with{' '}
          <span className="text-tech-accent">circuits</span> and create with{' '}
          <span className="text-art-accent italic">color</span>.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-art-muted"
        >
          I’m {site.name.split(' ')[0]} — an electronics &amp; telecommunication engineer and a
          visual artist. {site.tagline}
        </motion.p>

        {/* the bridge */}
        <div className="mt-10 w-full max-w-3xl">
          <CircuitBrush className="h-auto w-full" />
        </div>

        {/* portals */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Portal
            to="/technical"
            kind="tech"
            title="Technical World"
            subtitle="Engineering projects, skills, internships, certifications and resume."
            points={['Projects', 'Skills', 'Resume']}
          />
          <Portal
            to="/creative"
            kind="art"
            title="Creative World"
            subtitle="A gallery of paintings, sketches, crafts, graphic design and experiments."
            points={['Gallery', 'Process', 'Craft']}
          />
        </div>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/technical"
            className="rounded-full bg-art-ink px-6 py-3 text-sm font-medium text-art-bg transition-transform hover:scale-[1.03]"
          >
            Explore my work
          </Link>
          <a
            href={site.resumeUrl}
            className="rounded-full border border-art-line px-6 py-3 text-sm text-art-ink transition-colors hover:border-art-accent"
          >
            View résumé
          </a>
        </motion.div>
      </section>
    </main>
  )
}
