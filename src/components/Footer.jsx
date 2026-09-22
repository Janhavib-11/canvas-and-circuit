import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { Icon } from './SocialLinks.jsx'

// Shared, elegant "back-cover" footer used across every page — a warm espresso
// band that ties both worlds to one brand. `snap` adds the scroll-snap sizing
// used inside the landing's snap scroller.
export default function Footer({ snap = false }) {
  const profiles = [
    { name: 'github', label: 'GitHub', handle: '@Janhavib-11', href: site.links.github },
    { name: 'linkedin', label: 'LinkedIn', handle: 'in/janhavi-bawankule', href: site.links.linkedin },
    { name: 'pinterest', label: 'Pinterest', handle: 'Janhavi’s boards', href: site.links.pinterest },
  ]

  return (
    <footer
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
          snap ? 'min-h-[86vh]' : ''
        }`}
      >
        <p className="label text-brand-accent">— Let’s connect —</p>

        <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
          Engineer by discipline.{' '}
          <span className="font-script text-5xl text-brand-accent sm:text-7xl">
            Creator by passion.
          </span>
        </h2>

        {/* the three profile logos */}
        <div className="mt-14 flex flex-wrap items-center gap-8 sm:gap-12">
          {profiles.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="group flex items-center gap-4"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-art-bg/25 text-art-bg/85 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white">
                <Icon name={s.name} className="h-5 w-5" />
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
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-art-bg">Email</a>
          </nav>
        </div>

        <p className="mt-6 text-xs text-art-bg/40">
          © {new Date().getFullYear()} {site.name} · {site.concept}
        </p>
      </div>
    </footer>
  )
}
