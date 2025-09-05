import { useEffect, useState } from 'react'

const loaders = {
  news: () => import('../data/news.json'),
  events: () => import('../data/events.json'),
  members: () => import('../data/members.json'),
  partners: () => import('../data/partners.json'),
  gallery: () => import('../data/gallery.json'),
  chapters: () => import('../data/chapters.json'),
  site: () => import('../data/site.json'),
}

export function useData(key) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    const loader = loaders[key]
    if (!loader) {
      console.warn('Unknown data key:', key)
      setLoading(false)
      return
    }
    loader()
      .then(mod => { if (mounted) setData(mod.default) })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [key])
  return { data, loading }
}
