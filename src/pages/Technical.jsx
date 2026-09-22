import { motion, useReducedMotion } from 'framer-motion'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import LazyImage from '../components/LazyImage.jsx'
import Contact from '../components/Contact.jsx'
import { useSEO } from '../hooks/useSEO.js'
import { site } from '../data/site.js'
import { skillGroups } from '../data/skills.js'
import { projects } from '../data/projects.js'
import { experience } from '../data/experience.js'
import { certifications, achievements } from '../data/certifications.js'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

function SkillBar({ name, level }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-tech-ink">{name}</span>
        <span className="font-mono text-xs text-tech-muted">{level}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-tech-line">
        <motion.div
          className="h-full rounded-full bg-tech-accent"
          initial={reduce ? { width: `${level}%` } : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ p }) {
  return (
    <Reveal className="group flex flex-col overflow-hidden rounded-2xl border border-tech-line bg-white">
      <LazyImage src={p.image} alt={p.title} className="h-48 w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-tech-ink">{p.title}</h3>
          <span className="font-mono text-xs text-tech-muted">{p.year}</span>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <p><span className="label text-tech-accent">Problem</span><br /><span className="text-tech-muted">{p.problem}</span></p>
          <p><span className="label text-tech-accent">Solution</span><br /><span className="text-tech-muted">{p.solution}</span></p>
          <p><span className="label text-tech-accent">Outcome</span><br /><span className="text-tech-ink">{p.outcome}</span></p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full border border-tech-line px-2.5 py-1 font-mono text-[11px] text-tech-muted">{t}</span>
          ))}
        </div>
        <div className="mt-5 flex gap-4 border-t border-tech-line pt-4 label text-tech-accent">
          <a href={p.links.demo} className="hover:opacity-70">Live demo ↗</a>
          <a href={p.links.code} className="hover:opacity-70">Source ↗</a>
        </div>
      </div>
    </Reveal>
  )
}

export default function Technical() {
  useSEO({
    title: 'Technical World — Janhavi Bawankule | Electronics & Telecom Engineer',
    description:
      'Engineering projects, skills, internships (BSNL), certifications (NPTEL, MATLAB, CTF), achievements and résumé of Janhavi Bawankule.',
    themeColor: '#F4F5F7',
  })

  return (
    <div className="min-h-screen bg-tech-bg text-tech-ink">
      <Nav world="tech" sections={sections} />

      {/* Hero */}
      <section className="container-page relative pt-32 pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(#D7DCE3 1px, transparent 1px), linear-gradient(90deg, #D7DCE3 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
          }}
        />
        <div className="relative">
          <p className="label text-tech-accent">Technical World</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            Engineer by discipline.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-tech-muted">
            Electronics &amp; Telecommunication — where I turn constraints into working systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={site.resumeUrl} className="rounded-full bg-tech-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]">
              Download résumé
            </a>
            <a href="#projects" className="rounded-full border border-tech-line bg-white px-6 py-3 text-sm text-tech-ink transition-colors hover:border-tech-accent">
              See projects
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr]">
          <SectionHeading world="tech" eyebrow="About" title="Profile" />
          <Reveal className="space-y-5">
            <p className="text-lg leading-relaxed text-tech-muted">{site.aboutTechnical}</p>
            <dl className="grid grid-cols-2 gap-4 pt-4">
              {[
                ['Field', 'Electronics & Telecom'],
                ['Focus', 'Embedded · DSP · IoT'],
                ['Based in', site.location],
                ['Open to', 'Internships & roles'],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-tech-line pt-3">
                  <dt className="label text-tech-muted">{k}</dt>
                  <dd className="mt-1 text-sm text-tech-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container-page py-20">
        <SectionHeading world="tech" eyebrow="Skills" title="What I work with" />
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <Reveal key={g.label}>
              <p className="label mb-5 text-tech-muted">{g.label}</p>
              <div className="space-y-5">
                {g.items.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container-page py-20">
        <SectionHeading world="tech" eyebrow="Projects" title="Selected work" intro="Each project, from the problem it solved to the result it produced." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="container-page py-20">
        <SectionHeading world="tech" eyebrow="Experience" title="Internships & roles" />
        <div className="mt-12 space-y-8">
          {experience.map((e) => (
            <Reveal key={e.org} className="grid gap-4 border-l-2 border-tech-line pl-6 sm:grid-cols-[200px,1fr]">
              <div>
                <p className="font-display text-xl text-tech-ink">{e.org}</p>
                <p className="text-sm text-tech-muted">{e.role}</p>
                <p className="mt-1 font-mono text-xs text-tech-accent">{e.period}</p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-tech-muted">{e.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.departments.map((d) => (
                    <span key={d} className="rounded-full border border-tech-line px-2.5 py-1 font-mono text-[11px] text-tech-muted">{d}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Credentials: certs + achievements */}
      <section id="credentials" className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading world="tech" eyebrow="Certifications" title="Verified" />
            <div className="mt-8 divide-y divide-tech-line border-y border-tech-line">
              {certifications.map((c) => (
                <a key={c.name} href={c.link} className="flex items-center justify-between py-4 transition-colors hover:text-tech-accent">
                  <span className="text-sm text-tech-ink">{c.name}</span>
                  <span className="flex items-center gap-4">
                    <span className="hidden font-mono text-xs text-tech-muted sm:inline">{c.issuer}</span>
                    <span className="font-mono text-xs text-tech-accent">{c.year}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading world="tech" eyebrow="Achievements" title="Beyond the syllabus" />
            <div className="mt-8 space-y-4">
              {achievements.map((a) => (
                <Reveal key={a.title} className="rounded-xl border border-tech-line bg-white p-5">
                  <p className="font-medium text-tech-ink">{a.title}</p>
                  <p className="mt-1 text-sm text-tech-muted">{a.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact world="tech" />
      <Footer world="tech" />
    </div>
  )
}
