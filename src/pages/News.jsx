import { useMemo, useState } from 'react'
import Card from '../components/Card.jsx'
import Grid from '../components/Grid.jsx'
import SmartImage from '../components/SmartImage.jsx'
import Modal from '../components/Modal.jsx'
import { useData } from '../utils/useData.js'

export default function News() {
  const { data: news, loading: loadingNews } = useData('news')
  const { data: events, loading: loadingEvents } = useData('events')

  const [openNews, setOpenNews] = useState(null)

  const sortedNews = useMemo(() => {
    return [...(news || [])].sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [news])

  const { upcoming, past } = useMemo(() => {
    const now = new Date()
    const up = []
    const pa = []
    ;(events || []).forEach(ev => {
      const d = new Date(ev.date)
      if (d >= startOfDay(now)) up.push(ev)
      else pa.push(ev)
    })
    up.sort((a, b) => new Date(a.date) - new Date(b.date))
    pa.sort((a, b) => new Date(b.date) - new Date(a.date))
    return { upcoming: up, past: pa }
  }, [events])

  const skeletonCards = (count = 3) => (
    Array.from({ length: count }).map((_, i) => (
      <Card key={i}>
        <div className="w-full h-40 rounded bg-white/5 animate-pulse" />
        <div className="h-3 w-24 bg-white/10 rounded mt-3 animate-pulse" />
        <div className="h-4 w-3/4 bg-white/10 rounded mt-2 animate-pulse" />
        <div className="h-3 w-2/3 bg-white/10 rounded mt-2 animate-pulse" />
      </Card>
    ))
  )

  function humanDate(d) {
    try { return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) } catch { return d }
  }
  function relDays(d) {
    const one = 24 * 60 * 60 * 1000
    const diff = Math.round((startOfDay(new Date(d)) - startOfDay(new Date())) / one)
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Tomorrow'
    if (diff > 1) return `${diff} days`
    if (diff === -1) return 'Yesterday'
    return `${Math.abs(diff)} days ago`
  }
  function startOfDay(date) {
    const dd = new Date(date)
    dd.setHours(0,0,0,0)
    return dd
  }
  function toICSDate(date) {
    return new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  }
  function escapeICS(text = '') {
    return String(text)
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/,|;/g, (m) => ({ ',': '\\,', ';': '\\;' }[m]))
  }
  function downloadICS(ev) {
    const uid = `adv-news-${ev.id}@advjuansiksty`
    const dtStart = toICSDate(ev.date)
    const dtEnd = toICSDate(new Date(new Date(ev.date).getTime() + 2 * 60 * 60 * 1000)) // +2h
    const now = toICSDate(new Date())
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ADV Juansiksty Nation//News Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${escapeICS(ev.title)}`,
      ev.location ? `LOCATION:${escapeICS(ev.location)}` : null,
      ev.description ? `DESCRIPTION:${escapeICS(ev.description)}` : null,
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean).join('\r\n')
    const blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${ev.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="heading mb-3">Latest News</h1>
        <Grid cols={{ base: 1, sm: 2, lg: 3 }}>
          {loadingNews && skeletonCards(6)}
          {!loadingNews && sortedNews.map(n => (
            <Card key={n.id}>
              <SmartImage src={n.image} alt={n.title} className="w-full h-40 rounded bg-white/5" />
              <div className="text-xs text-white/60 mt-2">{humanDate(n.date)}</div>
              <div className="text-lg font-semibold mt-1">{n.title}</div>
              <p className="text-white/70 mt-1">{n.excerpt}</p>
              <div className="mt-3 flex gap-2">
                <button className="btn btn-outline btn-sm" onClick={() => setOpenNews(n)}>Read more</button>
              </div>
            </Card>
          ))}
        </Grid>
        <Modal open={!!openNews} onClose={() => setOpenNews(null)}>
          {openNews && (
            <div>
              <div className="text-xs text-white/60">{humanDate(openNews.date)}</div>
              <div className="text-2xl font-semibold mt-1">{openNews.title}</div>
        <div className="mt-3 flex justify-center">
                <SmartImage
                  src={openNews.image}
                  alt={openNews.title}
                  layout="intrinsic"
                  fit="contain"
          className="w-full max-w-full rounded bg-white/5"
          imgProps={{ style: { maxHeight: '70vh', width: '100%', height: 'auto', objectFit: 'contain' } }}
                />
              </div>
              <p className="text-white/80 mt-3 whitespace-pre-line">{openNews.content || openNews.excerpt}</p>
              {(() => {
                const m = (openNews.content || '').match(/https?:\/\/\S+/)
                if (!m) return null
                return (
                  <div className="mt-4">
                    <a href={m[0]} target="_blank" rel="noreferrer" className="btn btn-primary">Register now</a>
                  </div>
                )
              })()}
            </div>
          )}
        </Modal>
      </section>

      <section>
        <h2 className="heading mb-3">Calendar</h2>
        {loadingEvents && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{skeletonCards(3)}</div>
        )}
        {!loadingEvents && (
          <>
            {upcoming.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm uppercase tracking-widest text-white/60">Upcoming</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {upcoming.map(ev => (
                    <Card key={ev.id}>
                      {ev.image && (
                        <SmartImage src={ev.image} alt={ev.title} className="w-full h-40 rounded bg-white/5" fit="cover" />
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs text-white/60">{humanDate(ev.date)} • {relDays(ev.date)}</div>
                          <div className="text-lg font-semibold">{ev.title}</div>
                          {ev.location && <div className="text-white/70">{ev.location}</div>}
                        </div>
                        <div className="text-right flex flex-col gap-2">
                          <button className="btn btn-primary btn-sm" onClick={() => downloadICS(ev)}>Add to Calendar</button>
                          {ev.link && <a href={ev.link} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Register</a>}
                        </div>
                      </div>
                      {ev.description && <p className="text-white/60 mt-2">{ev.description}</p>}
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div className="space-y-2 mt-6">
                <div className="text-sm uppercase tracking-widest text-white/60">Past Events</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {past.map(ev => (
                    <Card key={ev.id}>
                      {ev.image && (
                        <SmartImage src={ev.image} alt={ev.title} className="w-full h-40 rounded bg-white/5" fit="cover" />
                      )}
                      <div className="text-xs text-white/60">{humanDate(ev.date)} • {relDays(ev.date)}</div>
                      <div className="text-lg font-semibold">{ev.title}</div>
                      {ev.location && <div className="text-white/70">{ev.location}</div>}
                      {ev.description && <p className="text-white/60 mt-1">{ev.description}</p>}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
