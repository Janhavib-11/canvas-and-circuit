import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { site } from '../data/site.js'

// Shared contact section. Form is front-end only (MVP) — wire to a service in Phase 2.
export default function Contact({ world }) {
  const isArt = world === 'art'
  const [sent, setSent] = useState(false)

  const tone = isArt
    ? {
        field: 'bg-art-bg border-art-line text-art-ink placeholder:text-art-muted focus:border-art-accent',
        btn: 'bg-art-accent text-white hover:bg-art-accent/90',
        card: 'border-art-line',
        muted: 'text-art-muted',
        ink: 'text-art-ink',
      }
    : {
        field: 'bg-tech-bg border-tech-line text-tech-ink placeholder:text-tech-muted focus:border-tech-accent',
        btn: 'bg-tech-accent text-white hover:bg-tech-accent/90',
        card: 'border-tech-line',
        muted: 'text-tech-muted',
        ink: 'text-tech-ink',
      }

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="container-page py-24">
      <SectionHeading
        world={world}
        eyebrow="Contact"
        title="Let’s make something."
        intro="Recruiter, collaborator or fellow maker — the inbox is open for both worlds."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal className="grid gap-4">
          {[
            { label: 'Email', value: site.email, href: `mailto:${site.email}` },
            { label: 'LinkedIn', value: 'in/janhavi-bawankule', href: site.links.linkedin },
            { label: 'GitHub', value: 'github.com/janhavi-bawankule', href: site.links.github },
            { label: 'Location', value: site.location, href: null },
          ].map((row) => (
            <div key={row.label} className={`flex items-baseline justify-between border-b ${tone.card} pb-3`}>
              <span className={`label ${tone.muted}`}>{row.label}</span>
              {row.href ? (
                <a href={row.href} target="_blank" rel="noreferrer" className={`text-sm ${tone.ink} hover:opacity-70`}>
                  {row.value}
                </a>
              ) : (
                <span className={`text-sm ${tone.ink}`}>{row.value}</span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div className={`flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border ${tone.card} p-8 text-center`}>
              <p className={`font-display text-2xl ${tone.ink}`}>Thank you.</p>
              <p className={`mt-2 text-sm ${tone.muted}`}>
                Your message is noted — I’ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              <input
                required
                type="text"
                placeholder="Your name"
                aria-label="Your name"
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${tone.field}`}
              />
              <input
                required
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${tone.field}`}
              />
              <textarea
                required
                rows={4}
                placeholder="Tell me about it…"
                aria-label="Message"
                className={`resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${tone.field}`}
              />
              <button
                type="submit"
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${tone.btn}`}
              >
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
