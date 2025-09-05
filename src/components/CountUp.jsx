import { useEffect, useRef, useState } from 'react'

// Animated number that counts up to a target when it enters the viewport.
// Accepts numbers or strings like "17,000+" and preserves suffixes (e.g., "+").
export default function CountUp({ value, duration = 1200 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const [display, setDisplay] = useState('0')

  const str = String(value ?? '')
  const numMatch = str.match(/[0-9][0-9,\.\s]*/)
  const numericPart = numMatch ? numMatch[0].replace(/[^0-9.]/g, '') : ''
  const target = numericPart ? Number(numericPart) : NaN
  const suffix = str.replace(numMatch ? numMatch[0] : '', '').trim()

  useEffect(() => {
    if (!ref.current) return
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      })
    }, { threshold: 0.4 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!shown) return
    if (!Number.isFinite(target)) {
      setDisplay(str)
      return
    }
    const start = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic
    const fmt = new Intl.NumberFormat('en-US')

    const step = (now) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const current = Math.round(target * ease(t))
      setDisplay(fmt.format(current))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, str])

  return (
    <span ref={ref}>{display}{suffix ? ` ${suffix}` : ''}</span>
  )
}
