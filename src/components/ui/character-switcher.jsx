// Interactive character-switcher card (adapted from the TSX to JSX).
// Reframed for this portfolio: the four "characters" are facets of one person,
// using the site's own portrait + gallery art instead of the demo's embedded
// base64 images. Root is neutralised so the card sits inline (not full-screen)
// and the paper/ink vars are tuned to the warm Creative palette.
import { useEffect, useRef, useState } from 'react'

const CHARACTERS = [
  {
    name: 'THE ENGINEER',
    note: 'Circuits & systems',
    image: '/images/portrait.webp',
    alt: 'Janhavi, the engineer',
    accent: '#2F6DF6',
  },
  {
    name: 'THE ARTIST',
    note: 'Colour & canvas',
    image: '/images/art/painting-kaleido-eye.jpg',
    alt: 'A vivid acrylic eye painting',
    accent: '#C1683C',
  },
  {
    name: 'THE MAKER',
    note: 'Hands-on craft',
    image: '/images/art/craft-lotus.jpg',
    alt: 'A quilled paper lotus relief',
    accent: '#6A6A45',
  },
  {
    name: 'THE DREAMER',
    note: 'Ideas & experiments',
    image: '/images/art/painting-indigo.jpg',
    alt: 'A fluid indigo acrylic pour',
    accent: '#B7794F',
  },
]

export function CharacterSwitcherCard({ autoPlay = false }) {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const timeoutRef = useRef(undefined)
  const character = CHARACTERS[index]

  function next() {
    if (leaving) return
    setLeaving(true)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setIndex((current) => (current + 1) % CHARACTERS.length)
      setLeaving(false)
    }, 120)
  }

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  useEffect(() => {
    if (!autoPlay) return
    const interval = window.setInterval(next, 2600)
    return () => window.clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, index])

  return (
    <div className="csc-root">
      <style>{STYLES}</style>
      <button
        aria-label={`Current facet: ${character.name}. Change facet.`}
        className="csc-card"
        onClick={next}
        onKeyDown={(event) => event.key === 'ArrowRight' && next()}
        style={{ '--accent': character.accent }}
        type="button"
      >
        <span className="csc-index">
          {String(index + 1).padStart(2, '0')} / {String(CHARACTERS.length).padStart(2, '0')}
        </span>
        <span className="csc-portrait">
          <img
            alt={character.alt}
            className={leaving ? 'is-leaving' : ''}
            key={character.image}
            src={character.image}
          />
          <i />
        </span>
        <span className="csc-copy">
          <b>{character.name}</b>
          <small>{character.note}</small>
        </span>
        <span className="csc-action">
          Change facet <span aria-hidden="true">→</span>
        </span>
      </button>
    </div>
  )
}

const STYLES = `
.csc-root{--paper:#F4EDE2;--ink:#38291B;width:100%;display:grid;place-items:center;color:var(--ink);font-family:inherit;box-sizing:border-box}
.csc-root *{box-sizing:border-box}
.csc-card{position:relative;width:clamp(220px,20vw,300px);padding:0;border:0;background:transparent;color:var(--ink);display:block;text-align:left;cursor:pointer;transform:rotate(2deg);outline:none;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.csc-card:hover{transform:rotate(-1deg) translateY(-5px)}
.csc-card:focus-visible{outline:2px solid var(--ink);outline-offset:9px}
.csc-index{position:absolute;z-index:2;top:14px;right:12px;padding:5px 7px;border-radius:99px;background:var(--paper);font-size:.52rem;letter-spacing:.08em;font-family:ui-monospace,monospace}
.csc-portrait{position:relative;display:block;aspect-ratio:.92;overflow:hidden;border-radius:48% 52% 44% 56% / 42% 48% 52% 58%;background:var(--accent);transition:border-radius .45s}
.csc-card:hover .csc-portrait{border-radius:57% 43% 53% 47% / 50% 55% 45% 50%}
.csc-portrait img{width:100%;height:100%;display:block;object-fit:cover;object-position:center top;transition:transform .45s ease,opacity .12s ease}
.csc-card:hover .csc-portrait img{transform:scale(1.035)}
.csc-portrait img.is-leaving{opacity:0;transform:scale(1.065)}
.csc-portrait i{position:absolute;inset:10px;border:1px solid color-mix(in srgb,var(--ink) 40%,transparent);border-radius:inherit}
.csc-copy{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:16px;margin-top:17px;padding:0 2px 18px;border-bottom:1px solid var(--ink)}
.csc-copy b{display:block;white-space:nowrap;font-weight:600;font-size:.84rem;line-height:1;letter-spacing:.04em}
.csc-copy small{display:block;margin:0;color:color-mix(in srgb,var(--ink) 72%,transparent);font:italic 400 .82rem/1 Georgia,serif}
.csc-action{margin:0 2px;padding:12px 0 1px;display:flex;justify-content:space-between;align-items:center;font-size:.55rem;text-transform:uppercase;letter-spacing:.12em}
.csc-action>span{font-size:1rem;line-height:1;transition:transform .2s ease}
.csc-card:hover .csc-action>span{transform:translateX(3px)}
@media(prefers-reduced-motion:reduce){.csc-root *{transition-duration:.01ms!important}}
`

export default CharacterSwitcherCard
