import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import WorldSwitch from './WorldSwitch.jsx'
import { site } from '../data/site.js'

// Shared nav. `world` = 'tech' | 'art'. `sections` = [{ id, label }] for in-page anchors.
export default function Nav({ world, sections = [] }) {
  const isArt = world === 'art'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tone = isArt
    ? {
        text: 'text-art-ink',
        muted: 'text-art-muted hover:text-art-ink',
        bar: scrolled ? 'bg-art-bg/80 border-art-line' : 'bg-transparent border-transparent',
        panel: 'bg-art-surface border-art-line',
      }
    : {
        text: 'text-tech-ink',
        muted: 'text-tech-muted hover:text-tech-ink',
        bar: scrolled ? 'bg-tech-bg/85 border-tech-line' : 'bg-transparent border-transparent',
        panel: 'bg-white border-tech-line',
      }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${tone.bar}`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className={`font-display text-lg ${tone.text}`}>
          <span className="font-semibold">Canvas</span>
          <span className={isArt ? 'text-art-accent' : 'text-tech-accent'}> &amp; </span>
          <span className="italic">Circuit</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`label ${tone.muted} transition-colors`}
            >
              {s.label}
            </a>
          ))}
          <WorldSwitch world={world} />
        </div>

        {/* Mobile trigger */}
        <button
          className={`md:hidden ${tone.text}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-current" />
            <span className="block h-0.5 w-6 bg-current" />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden border-t md:hidden ${tone.panel}`}
          >
            <div className="container-page flex flex-col gap-4 py-6">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`label ${tone.muted}`}
                >
                  {s.label}
                </a>
              ))}
              <div className="pt-2">
                <WorldSwitch world={world} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
