import { useEffect, useMemo, useState } from 'react'

// SmartImage: lazy loads with optional low-res blur placeholder, avoids CLS via width/height or aspect classes.
// Props: src, alt, className, width, height, sizes, priority (eager), decoding (default 'async'), imgProps
export default function SmartImage({
  src = '',
  alt = '',
  className = '',
  width,
  height,
  sizes,
  priority = false,
  decoding = 'async',
  fit = 'cover', // 'cover' | 'contain'
  layout = 'fill', // 'fill' | 'intrinsic'
  imgProps = {},
}) {
  const [loaded, setLoaded] = useState(false)

  const placeholderSrc = useMemo(() => makeLowRes(src), [src])

  // Preload high-priority images (e.g., hero) for faster LCP
  useEffect(() => {
    if (!priority || !src) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [priority, src])

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  if (layout === 'intrinsic') {
    return (
      <span className={`relative block ${className}`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={decoding}
          onLoad={() => setLoaded(true)}
          className={`relative z-10 w-full h-auto ${fitClass} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          {...imgProps}
        />
      </span>
    )
  }

  return (
    <span className={`relative block overflow-hidden ${className}`} style={{ contain: 'content' }}>
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full ${fitClass} blur-sm ${fit === 'contain' ? '' : 'scale-105'} transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        className={`relative z-10 w-full h-full ${fitClass} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...imgProps}
      />
    </span>
  )
}

function makeLowRes(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('images.unsplash.com')) {
      // Downscale to tiny width with low quality for quick placeholder
      // Replace or set w=24 and q=10
      const params = u.searchParams
      params.set('w', params.get('w') || '24')
      params.set('q', '10')
      u.search = params.toString()
      return u.toString()
    }
    if (u.hostname.includes('dummyimage.com')) {
      // Reduce dimensions if pattern like /240x80/
      u.pathname = u.pathname.replace(/\/(\d+)x(\d+)\//, '/60x20/')
      return u.toString()
    }
  } catch {}
  return null
}
