import { useEffect, useRef, useState } from 'react'

export default function Carousel({ items = [], renderItem, interval = 4000, className = '' }) {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (!items.length) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(timer.current)
  }, [items.length, interval])

  if (!items.length) return null
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg">
        <div className="whitespace-nowrap transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((it, i) => (
            <div key={i} className="inline-block align-top w-full">
              {renderItem(it, i)}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} aria-label={`Slide ${i+1}`} className={`w-2 h-2 rounded-full ${i===index? 'bg-primary':'bg-white/40'}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </div>
  )
}
