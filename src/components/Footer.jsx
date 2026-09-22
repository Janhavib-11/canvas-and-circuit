import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import SocialLinks from './SocialLinks.jsx'

export default function Footer({ world }) {
  const isArt = world === 'art'
  const tone = isArt
    ? { border: 'border-art-line', muted: 'text-art-muted', ink: 'text-art-ink', accent: 'text-art-accent' }
    : { border: 'border-tech-line', muted: 'text-tech-muted', ink: 'text-tech-ink', accent: 'text-tech-accent' }

  return (
    <footer className={`border-t ${tone.border}`}>
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className={`font-display text-base ${tone.ink}`}>
            Canvas<span className={tone.accent}> &amp; </span>
            <span className="italic">Circuit</span>
          </Link>
          <p className={`mt-1 text-sm ${tone.muted}`}>{site.concept}</p>
        </div>
        <SocialLinks world={world} />
      </div>
      <div className={`container-page border-t ${tone.border} py-5`}>
        <p className={`text-xs ${tone.muted}`}>
          © {new Date().getFullYear()} {site.name}. Built with circuits and colour.
        </p>
      </div>
    </footer>
  )
}
