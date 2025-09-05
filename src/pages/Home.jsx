import Hero from '../components/Hero.jsx'
import Carousel from '../components/Carousel.jsx'
import Card from '../components/Card.jsx'
import Grid from '../components/Grid.jsx'
import { Link } from 'react-router-dom'
import LogoSlider from '../components/LogoSlider.jsx'
import { useData } from '../utils/useData.js'
import SmartImage from '../components/SmartImage.jsx'

export default function Home() {
  const { data: news } = useData('news')
  const { data: events } = useData('events')
  const { data: partners } = useData('partners')
  const nationalPartners = (partners || []).filter(p => p.category === 'National')
  const { data: site } = useData('site')

  return (
    <div className="space-y-8">
      <Hero />

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="heading">News & Announcements</h2>
          <Link to="/news" className="text-primary hover:underline">View all</Link>
        </div>
        <Carousel
          items={news.slice(0, 5)}
          renderItem={(n) => (
            <Card className="p-0">
              <div className="grid sm:grid-cols-2">
                <SmartImage src={n.image} alt={n.title} className="w-full h-56" />
                <div className="p-4">
                  <div className="text-xs text-white/60">{new Date(n.date).toLocaleDateString()}</div>
                  <h3 className="text-xl font-semibold mt-1">{n.title}</h3>
                  <p className="text-white/70 mt-2">{n.excerpt}</p>
                </div>
              </div>
            </Card>
          )}
        />
      </section>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="heading">Upcoming Events</h2>
          <Link to="/news" className="text-primary hover:underline">Calendar</Link>
        </div>
        <Grid cols={{ base: 1, sm: 2, lg: 3 }}>
          {events.map(ev => (
            <Card key={ev.id}>
              <div className="text-xs text-white/60">{new Date(ev.date).toLocaleDateString()} • {ev.location}</div>
              <div className="text-lg font-semibold mt-1">{ev.title}</div>
              <p className="text-white/70 mt-2">{ev.description}</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="heading">Partners</h2>
          <Link to="/partners" className="text-primary hover:underline">See all</Link>
        </div>
  <LogoSlider size="lg" logos={nationalPartners.length ? nationalPartners : partners} />
      </section>

      <section>
        <div className="heading mb-3">Quick Links</div>
        <div className="flex flex-wrap gap-3">
          {(site.contact?.quickLinks || []).map((q, i) => (
            <Link key={i} to={q.to} className={`btn ${q.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}>{q.label}</Link>
          ))}
        </div>
      </section>
    </div>
  )
}
