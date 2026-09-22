import { useState } from 'react'

// Lazy, aspect-ratio-safe image with a fade-in once loaded.
export default function LazyImage({ src, alt, ratio, className = '', imgClassName = '' }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative overflow-hidden bg-black/20 ${className}`}
      style={ratio ? { aspectRatio: String(1 / ratio) } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
