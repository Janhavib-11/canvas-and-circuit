import Reveal from './Reveal.jsx'

// Consistent section header across both worlds — same structure, world-tinted.
export default function SectionHeading({ eyebrow, title, intro, world, align = 'left' }) {
  const isArt = world === 'art'
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className={`label mb-3 ${isArt ? 'text-art-accent' : 'text-tech-accent'}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl ${
          isArt ? 'text-art-ink' : 'text-tech-ink'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed ${isArt ? 'text-art-muted' : 'text-tech-muted'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
