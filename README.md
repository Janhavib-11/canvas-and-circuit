# Canvas & Circuit

A dual-identity portfolio for **Janhavi Bawankule** — Electronics & Telecommunication engineer *and* visual creator. One personal brand, two visual modes: a **Technical World** and a **Creative World**, bridged on the landing page by a circuit trace that morphs into a brushstroke.

Built per the *Canvas & Circuit* PRD.

## Stack
- **React 18** + **Vite**
- **Tailwind CSS** (custom two-world design tokens)
- **Framer Motion** (reveals, parallax, world switch)
- **React Router** (`/`, `/technical`, `/creative`)

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Project structure

```
src/
  pages/       Landing.jsx · Technical.jsx · Creative.jsx
  components/  Nav, Footer, WorldSwitch, CircuitBrush (the morph),
               Reveal, SectionHeading, LazyImage, Lightbox, Contact
  data/        <-- edit these to update content, no layout changes
    site.js            name, tagline, email, links, résumé, about text
    skills.js          grouped skills + levels
    projects.js        technical projects (problem→solution→tech→outcome)
    experience.js      internships / roles (BSNL, etc.)
    certifications.js  certifications + achievements
    artworks.js        gallery pieces + categories
  hooks/       useSEO.js (per-route title / meta / theme-color)
```

## Updating content

- **Add a project** → append an object to `src/data/projects.js`.
- **Add an artwork** → append to `src/data/artworks.js` (set `category`, `medium`, `year`, `story`, and a `ratio` = height/width for masonry).
- **Résumé** → drop `resume.pdf` into `public/` (linked as `/resume.pdf`).
- **Real images** → replace the `picsum.photos` placeholder URLs with your own (prefer WebP/AVIF). Images already lazy-load and preserve aspect ratio.
- **Links / email / bio** → `src/data/site.js`.

## What's implemented (MVP per PRD)
- Landing with dual portals + circuit→brush morph bridge, Explore / Résumé CTAs
- Technical World: About, Skills, Projects, Experience, Certifications, Achievements, Résumé CTA, Contact
- Creative World: parallax floating-frame hero, filterable masonry gallery, lightbox (title/medium/year/story, keyboard ← → Esc), process section
- Shared, world-aware Contact + Footer, animated world switch in the nav
- Mobile-first responsive, `prefers-reduced-motion` honored, lazy images, per-route SEO/OG meta, accessible focus states
- SPA rewrites for Netlify (`public/_redirects`) and Vercel (`vercel.json`)

## Phase 2 (per PRD, not yet built)
Wire the contact form to an email service, dynamic content management, case-study pages, analytics, optional WebGL accents.

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
