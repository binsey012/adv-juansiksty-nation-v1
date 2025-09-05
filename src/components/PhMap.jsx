import React from 'react'

// Stylized, license-friendly Philippines silhouette split into Luzon / Visayas / Mindanao.
// This is hand-crafted and approximate (not geospatially exact) but closer to real outlines
// than simple ellipses. Intended for decorative selection/summary purposes.
export default function PhMap({ counts = {}, selected, onSelect }) {
  const palette = {
    Luzon: { active: '#ef4444', inactive: 'rgba(239,68,68,0.35)' },
    Visayas: { active: '#eab308', inactive: 'rgba(234,179,8,0.35)' },
    Mindanao: { active: '#22c55e', inactive: 'rgba(34,197,94,0.35)' },
  }

  const handle = (key) => () => onSelect && onSelect(key)

  // Region vector definitions. These are original, simplified shapes.
  const defs = {
    Luzon: {
      label: { x: 110, y: 100 },
      paths: [
        // Main Luzon mass
        {
          d: 'M 105 40 L 135 65 L 130 85 L 150 112 L 120 135 L 100 120 L 92 93 L 82 74 L 98 55 Z',
        },
        // Northern tip (Batanes-ish)
        { d: 'M 110 25 L 118 32 L 110 38 L 102 32 Z' },
      ],
    },
    Visayas: {
      label: { x: 150, y: 200 },
      // Represent as island cluster (several blobs)
      circles: [
        { cx: 140, cy: 185, r: 10 }, // Panay-ish
        { cx: 162, cy: 190, r: 9 },  // Negros-ish
        { cx: 180, cy: 205, r: 8 },  // Cebu-ish
        { cx: 160, cy: 215, r: 7 },  // Bohol-ish
        { cx: 190, cy: 220, r: 6 },  // Leyte-ish
        { cx: 205, cy: 210, r: 6 },  // Samar-ish
      ],
    },
    Mindanao: {
      label: { x: 190, y: 305 },
      paths: [
        {
          d: 'M 175 255 C 200 245 235 265 240 290 C 244 314 220 345 190 342 C 168 338 158 315 168 295 C 170 280 165 270 175 255 Z',
        },
        // Davao Gulf notch
        { d: 'M 205 300 C 210 292 220 294 225 305 C 220 312 212 312 205 300 Z' },
      ],
    },
  }

  const regions = ['Luzon', 'Visayas', 'Mindanao']

  return (
    <div className="relative" aria-label="Philippines regions mini map" role="img">
      <svg viewBox="0 0 320 420" className="w-full h-auto">
        <defs>
          <linearGradient id="sea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#0a0f19" />
          </linearGradient>
          <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="black" floodOpacity="0.4" />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* background sea + grid */}
        <rect x="0" y="0" width="320" height="420" fill="url(#sea)" />
        <rect x="0" y="0" width="320" height="420" fill="url(#grid)" />
        {regions.map((key) => {
          const isActive = !selected || selected === key
          const fill = isActive ? palette[key].active : palette[key].inactive
          const stroke = isActive ? 'white' : 'rgba(255,255,255,0.5)'
          const def = defs[key]
          return (
            <g
              key={key}
              onClick={handle(key)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handle(key)()}
              tabIndex={0}
              role="button"
              aria-pressed={selected === key}
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60 rounded-sm"
              style={{ transition: 'transform 220ms ease, opacity 220ms ease', transform: isActive ? 'scale(1.02)' : 'scale(0.98)', transformOrigin: `${def.label.x}px ${def.label.y}px`, opacity: isActive ? 1 : 0.85 }}
            >
              {def.paths && def.paths.map((p, idx) => (
                <path key={idx} d={p.d} fill={fill} stroke={stroke} strokeWidth="2" filter="url(#glow)" />
              ))}
              {def.circles && def.circles.map((c, idx) => (
                <circle key={idx} cx={c.cx} cy={c.cy} r={c.r} fill={fill} stroke={stroke} strokeWidth="2" filter="url(#glow)" />
              ))}
              <g>
                <rect x={def.label.x - 32} y={def.label.y - 12} width="64" height="24" rx="6" fill="rgba(255,255,255,0.9)" />
                <text x={def.label.x} y={def.label.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#0f172a" fontWeight="700">
                  {key}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
      <div className="absolute right-0 top-0 text-xs bg-black/40 border border-white/10 rounded-md overflow-hidden">
        {regions.map((key) => (
          <div key={key} className="flex items-center gap-2 px-2 py-1 border-b border-white/10 last:border-b-0">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: palette[key].active }} />
            <span className="text-white/80">{key}</span>
            <span className="ml-1 text-white/60">{counts[key] ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
