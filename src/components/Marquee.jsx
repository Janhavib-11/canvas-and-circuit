// Infinite running-text ribbon. Duplicates its content so the loop is seamless.
export default function Marquee({
  items = [],
  reverse = false,
  duration = 26,
  className = '',
  itemClassName = '',
  separator = '✦',
}) {
  const track = (
    <div
      className={`flex shrink-0 items-center gap-8 pr-8 ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      }`}
    >
      {items.map((it, i) => (
        <span key={i} className={`flex items-center gap-8 whitespace-nowrap ${itemClassName}`}>
          {it}
          <span className="text-brand-accent opacity-70">{separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`marquee-paused flex w-full overflow-hidden ${className}`}
      style={{ '--marquee-duration': `${duration}s` }}
    >
      {track}
      {/* duplicate for seamless loop */}
      <div
        aria-hidden
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {items.map((it, i) => (
          <span key={i} className={`flex items-center gap-8 whitespace-nowrap ${itemClassName}`}>
            {it}
            <span className="text-brand-accent opacity-70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
