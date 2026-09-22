import { site } from '../data/site.js'

// Inline brand logos (fill = currentColor) so they tint with the theme.
const ICONS = {
  github: (
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.08.78 2.18v3.24c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
  ),
  pinterest: (
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.16-.1-.95-.2-2.4.04-3.44.22-.93 1.4-5.94 1.4-5.94s-.36-.72-.36-1.78c0-1.66.97-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.57-1 4-.28 1.2.6 2.18 1.79 2.18 2.15 0 3.8-2.27 3.8-5.54 0-2.9-2.08-4.92-5.05-4.92-3.44 0-5.46 2.58-5.46 5.25 0 1.04.4 2.16.9 2.76.1.12.11.22.08.34-.09.38-.3 1.2-.34 1.36-.05.22-.18.27-.41.16-1.53-.71-2.48-2.94-2.48-4.73 0-3.85 2.8-7.39 8.06-7.39 4.23 0 7.52 3.02 7.52 7.05 0 4.2-2.65 7.59-6.33 7.59-1.24 0-2.4-.64-2.8-1.4l-.76 2.9c-.27 1.06-1.01 2.39-1.51 3.2A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0Z" />
  ),
  email: (
    <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm2 .4V19h16V5.4l-8 5.6-8-5.6ZM19.2 5H4.8L12 10l7.2-5Z" />
  ),
}

export function Icon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

// A row of round, tappable brand-logo links. `world` = 'tech' | 'art'.
export default function SocialLinks({ world = 'art', className = '' }) {
  const isArt = world === 'art'
  const ring = isArt ? 'border-art-line text-art-muted' : 'border-tech-line text-tech-muted'
  const hover = isArt
    ? 'hover:border-brand-accent hover:text-brand-accent'
    : 'hover:border-tech-accent hover:text-tech-accent'

  const items = [
    { name: 'github', label: 'GitHub', href: site.links.github },
    { name: 'linkedin', label: 'LinkedIn', href: site.links.linkedin },
    { name: 'pinterest', label: 'Pinterest', href: site.links.pinterest },
    { name: 'email', label: 'Email', href: `mailto:${site.email}` },
  ]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((it) => (
        <a
          key={it.name}
          href={it.href}
          target={it.name === 'email' ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={it.label}
          title={it.label}
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${ring} ${hover}`}
        >
          <Icon name={it.name} />
        </a>
      ))}
    </div>
  )
}
