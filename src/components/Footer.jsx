import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { Icon } from './SocialLinks.jsx'

// Shared "Let's connect" footer — a warm espresso back-cover that also holds the
// working contact form, so anyone can message from any page. `snap` adds the
// scroll-snap sizing used inside the landing's snap scroller.
const isConfigured =
  site.formAccessKey && site.formAccessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'

export default function Footer({ snap = false }) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const profiles = [
    { name: 'github', label: 'GitHub', handle: '@Janhavib-11', href: site.links.github },
    { name: 'linkedin', label: 'LinkedIn', handle: 'in/janhavi-bawankule', href: site.links.linkedin },
    { name: 'pinterest', label: 'Pinterest', handle: 'Janhavi’s boards', href: site.links.pinterest },
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot

    if (!isConfigured) {
      setError('Form isn’t connected yet — please email ' + site.email + ' directly.')
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
        setError(json.message || 'Something went wrong. Please email me directly.')
      }
    } catch {
      setError('Network error. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
  }

  const field =
    'w-full rounded-xl border border-art-bg/20 bg-art-bg/5 px-4 py-3 text-sm text-art-bg placeholder:text-art-bg/40 outline-none transition-colors focus:border-brand-accent'

  return (
    <footer
      id="contact"
      className={`relative overflow-hidden bg-art-ink text-art-bg ${snap ? 'snap-start' : ''}`}
    >
      {/* faint monogram + terracotta glow for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-6 select-none font-display text-[16rem] leading-none text-art-bg/[0.04]"
      >
        C&amp;C
      </span>
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl" />

      <div
        className={`container-page relative flex flex-col justify-center py-20 ${
          snap ? 'min-h-[92vh]' : ''
        }`}
      >
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — statement, logos, details */}
          <div>
            <p className="label text-brand-accent">— Let’s connect —</p>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.05] sm:text-5xl">
              Engineer by discipline.{' '}
              <span className="font-script text-4xl text-brand-accent sm:text-6xl">
                Creator by passion.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm text-art-bg/55">
              Recruiter, collaborator or fellow maker — the inbox is open for both worlds.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              {profiles.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group flex items-center gap-3"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-art-bg/25 text-art-bg/85 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white">
                    <Icon name={s.name} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-medium">{s.label}</span>
                    <span className="block text-xs text-art-bg/50 transition-colors group-hover:text-art-bg/80">
                      {s.handle}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-2 text-sm text-art-bg/55">
              <a href={`mailto:${site.email}`} className="hover:text-art-bg">{site.email}</a>
              <span>{site.phone}</span>
              <span>{site.location}</span>
            </div>
          </div>

          {/* RIGHT — the message form */}
          <div>
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-art-bg/15 bg-art-bg/5 p-8 text-center">
                <p className="font-display text-2xl">Thank you.</p>
                <p className="mt-2 text-sm text-art-bg/60">
                  Your message is on its way — I’ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <input required type="text" name="name" placeholder="Your name" aria-label="Your name" className={field} />
                <input required type="email" name="email" placeholder="Email address" aria-label="Email address" className={field} />
                <textarea required rows={4} name="message" placeholder="Tell me about it…" aria-label="Message" className={`${field} resize-none`} />
                {/* honeypot */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                {error ? <p className="text-sm text-red-300">{error}</p> : null}
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-full bg-brand-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent/90 disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* divider + bottom row */}
        <div className="mt-16 flex flex-col gap-6 border-t border-art-bg/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="font-display text-lg">
            Canvas<span className="text-brand-accent"> &amp; </span>
            <span className="italic">Circuit</span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 label text-art-bg/60">
            <Link to="/technical" className="transition-colors hover:text-art-bg">Technical</Link>
            <Link to="/creative" className="transition-colors hover:text-art-bg">Creative</Link>
            <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-art-bg">Résumé</a>
          </nav>
        </div>
        <p className="mt-6 text-xs text-art-bg/40">
          © {new Date().getFullYear()} {site.name} · {site.concept}
        </p>
      </div>
    </footer>
  )
}
