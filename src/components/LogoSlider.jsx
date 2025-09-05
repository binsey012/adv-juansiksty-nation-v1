import SmartImage from './SmartImage.jsx'

// size preset controls tile and image max-height for readability
export default function LogoSlider({ logos = [], size = 'md' }) {
  const list = [...logos, ...logos]
  const presets = {
    sm: { tile: 'w-40 h-16 p-2', imgMaxH: '3rem' },
    md: { tile: 'w-48 h-24 p-3', imgMaxH: '4.25rem' },
    lg: { tile: 'w-64 h-32 p-4', imgMaxH: '6rem' },
  }
  const preset = presets[size] ?? presets.md
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
      <div className="flex flex-nowrap items-center animate-marquee" style={{ width: '200%' }}>
        {list.map((p, i) => (
          <div
            key={i}
            className={`m-2 sm:m-3 relative rounded bg-black/40 border border-white/10 grid place-content-center shrink-0 ${preset.tile}`}
          >
            {/* subtle mask for contrast on various logo backgrounds */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 mix-blend-overlay" />
            <SmartImage
              src={p.logo}
              alt={p.name}
              layout="intrinsic"
              fit="contain"
              className="w-full"
              imgProps={{
                style: {
                  width: '100%',
                  height: 'auto',
                  maxHeight: preset.imgMaxH,
                  objectFit: 'contain',
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
