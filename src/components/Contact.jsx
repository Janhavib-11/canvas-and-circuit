import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import SocialLinks from './SocialLinks.jsx'
import { site } from '../data/site.js'

// Shared contact section. Submits to Web3Forms → emails site.email. No backend.
const isConfigured =
  site.formAccessKey && site.formAccessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'

export default function Contact({ world }) {
  const isArt = world === 'art'
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)
    // Honeypot: real users leave this empty; bots fill it.
    if (data.get('botcheck')) return

    if (!isConfigured) {
      setError(
        'The contact form isn’t connected yet. Please email ' + site.email + ' directly for now.',
      )
      return
    }

    data.append('access_key', site.formAccessKey)
    data.append('subject', `New message from your portfolio — ${data.get('name') || 'visitor'}`)
    data.append('from_name', 'Canvas & Circuit')

    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setSent(true)
        form.reset()
      } else {
        setError(json.message || 'Something went wrong. Please try again or email me directly.')
      }
    } catch {
      setError('Network error. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
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
            { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
            { label: 'LinkedIn', value: 'in/janhavi-bawankule', href: site.links.linkedin },
            { label: 'GitHub', value: 'github.com/Janhavib-11', href: site.links.github },
            { label: 'Pinterest', value: 'Janhavi’s boards', href: site.links.pinterest },
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
          <SocialLinks world={world} className="pt-2" />
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
                name="name"
                placeholder="Your name"
                aria-label="Your name"
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${tone.field}`}
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                aria-label="Email address"
                className={`rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${tone.field}`}
              />
              <textarea
                required
                rows={4}
                name="message"
                placeholder="Tell me about it…"
                aria-label="Message"
                className={`resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors ${tone.field}`}
              />
              {/* honeypot — hidden from people, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={sending}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors disabled:opacity-60 ${tone.btn}`}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
