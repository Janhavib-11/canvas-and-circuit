import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Full-screen artwork viewer with metadata. Keyboard: Esc closes, ←/→ navigate.
export default function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, ${item.medium}`}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10 sm:left-6"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10 sm:right-6"
          >
            →
          </button>

          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-5xl flex-col gap-4 sm:flex-row sm:items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[70vh] w-full rounded-lg object-contain sm:max-h-[82vh] sm:flex-1"
            />
            <figcaption className="sm:w-64 sm:shrink-0">
              <p className="label text-brand-accent">{item.category}</p>
              <h3 className="mt-2 font-display text-2xl text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/60">
                {item.medium} · {item.year}
              </p>
              {item.story && (
                <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-relaxed text-white/70">
                  {item.story}
                </p>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
