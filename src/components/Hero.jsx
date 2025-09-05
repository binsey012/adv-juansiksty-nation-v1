import Button from './Button.jsx'
import { Link } from 'react-router-dom'
import { useData } from '../utils/useData.js'
import SmartImage from './SmartImage.jsx'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Hero() {
  const { data: site } = useData('site')
  const hero = site.hero || {}
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const hasVideo = !!hero.video?.src
  const videoFit = (hero.video?.fit === 'contain' ? 'contain' : 'cover')

  useEffect(() => {
    // Detect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduceMotion(!!mq.matches)
      const onChange = (e) => setReduceMotion(!!e.matches)
      mq.addEventListener?.('change', onChange)
      return () => mq.removeEventListener?.('change', onChange)
    }
  }, [])

  useEffect(() => {
    // Pause if navigating away or component unmounts
    return () => {
      if (videoRef.current) {
        try { videoRef.current.pause() } catch {}
      }
    }
  }, [])
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10 bg-black min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
      {/* Background: show image underneath; video sits on top if provided */}
      {hero.image && (
        <SmartImage
          src={hero.image}
          alt="Hero background"
          priority
          className="absolute inset-0"
          imgProps={{ style: { objectPosition: 'center' } }}
        />
      )}

    {hasVideo && !videoError && (
        <video
          ref={videoRef}
      className={`absolute inset-0 w-full h-full ${videoFit === 'contain' ? 'object-contain bg-transparent' : 'object-cover'}`}
          // Prefer multiple sources when provided for better codec support
          preload="metadata"
          poster={hero.image || undefined}
          autoPlay={!reduceMotion}
          playsInline
          muted={isMuted}
          controls={false}
          loop
          onError={() => setVideoError(true)}
          style={{ objectPosition: hero.video?.position || 'center' }}
        >
          {Array.isArray(hero.video?.sources) && hero.video.sources.length > 0 ? (
            hero.video.sources.map((s, i) => (
              <source key={i} src={s.src} type={s.type} />
            ))
          ) : (
            <source src={hero.video.src} type="video/mp4" />
          )}
        </video>
      )}

      {/* Cinematic scrim for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] p-8 sm:p-12 lg:p-16 flex items-end">
        <div>
          <div className="subheading">Philippines • Riding Club</div>
          <h1 className="heading text-white mt-2">{hero.title || 'ADV Juansiksty Nation RT'}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{hero.subtitle || ''}</p>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            {(hero.cta || []).map((c, i) => (
              <Link key={i} to={c.to} className={`btn ${c.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}>{c.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mute/Unmute control */}
  {hasVideo && !reduceMotion && !videoError && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            type="button"
            className="btn btn-outline text-xs"
            onClick={() => {
              const v = videoRef.current
              if (!v) return
              try {
                // If reducing motion, do not force play on unmute
                if (!reduceMotion && v.paused) v.play()
              } catch {}
              setIsMuted((m) => !m)
              if (v) v.muted = !isMuted
            }}
            aria-label={isMuted ? 'Unmute hero video' : 'Mute hero video'}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      )}
    </section>
  )
}
