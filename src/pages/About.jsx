import Card from '../components/Card.jsx'
import CountUp from '../components/CountUp.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { useData } from '../utils/useData.js'

function Tree({ node }) {
  return (
    <div className="ml-4 border-l border-white/10 pl-4">
      <div className="font-semibold">{node.name}</div>
      {node.children?.map((c, i) => <Tree key={i} node={c} />)}
    </div>
  )
}

function Icon({ name, className = '' }) {
  switch (name) {
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M16 11c1.933 0 3.5-1.567 3.5-3.5S17.933 4 16 4s-3.5 1.567-3.5 3.5S14.067 11 16 11Zm-8 0c1.933 0 3.5-1.567 3.5-3.5S9.933 4 8 4 4.5 5.567 4.5 7.5 6.067 11 8 11Zm0 2c-2.761 0-5 2.239-5 5 0 .552.448 1 1 1h8c.552 0 1-.448 1-1 0-2.761-2.239-5-5-5Zm8 0c-.737 0-1.432.149-2.067.42A6.015 6.015 0 0 1 18 19c0 .552.448 1 1 1h3c.552 0 1-.448 1-1 0-2.761-2.239-5-5-5Z" />
        </svg>
      )
    case 'map':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M15 4.6 9 6.8 3 4.6v14.8l6 2.2 6-2.2 6 2.2V6.6l-6-2Zm0 2.236 4 1.468v10.867l-4-1.468V6.836ZM5 6.304l4 1.468v10.867l-4-1.468V6.304Zm8 1.164-2 .733v10.867l2-.733V7.468Z" />
        </svg>
      )
    case 'groups':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 7a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-6 8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2H6Zm11.5-7a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 17.5 8Zm-11 0A2.5 2.5 0 1 0 4 5.5 2.5 2.5 0 0 0 6.5 8Z" />
        </svg>
      )
    case 'id':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm4 3h6v2H7Zm0 4h10v2H7Zm0 4h6v2H7Z" />
        </svg>
      )
    default:
      return null
  }
}

export default function About() {
  const { data: site } = useData('site')
  const org = site.about?.org || { name: 'Founder' }
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold">Mission & Vision</h2>
        <div className={`mt-3 grid gap-4 ${site.about?.missionVisionImage ? 'sm:grid-cols-2 items-start' : ''}`}>
          <div className="space-y-3">
            <div>
              <div className="text-sm uppercase tracking-widest text-white/60">Mission</div>
              <p className="text-white/80 mt-1">{site.about?.mission}</p>
            </div>
            {site.about?.vision && (
              <div>
                <div className="text-sm uppercase tracking-widest text-white/60">Vision</div>
                <p className="text-white/80 mt-1">{site.about?.vision}</p>
              </div>
            )}
          </div>
          {site.about?.missionVisionImage && (
            <div className="order-first sm:order-none">
              <SmartImage
                src={site.about.missionVisionImage}
                alt="Mission and Vision"
                fit="contain"
                className="aspect-video w-full rounded border border-white/10 ring-1 ring-white/10 bg-white/5"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Stats band */}
      {site.about?.stats && (
        <Card>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {(Array.isArray(site.about.stats)
              ? site.about.stats
              : [
                  { label: 'Members', value: site.about.stats.members },
                  { label: 'Provinces', value: site.about.stats.provinces },
                  { label: 'Core Groups', value: site.about.stats.coreGroups },
                  { label: 'Rides', value: site.about.stats.rides },
                ]
            ).map((s, i) => {
              const accents = [
                { bg: 'bg-red-600/15', ring: 'ring-red-600/30', icon: 'text-red-400', name: 'users' },
                { bg: 'bg-yellow-500/15', ring: 'ring-yellow-500/30', icon: 'text-yellow-400', name: 'map' },
                { bg: 'bg-green-600/15', ring: 'ring-green-600/30', icon: 'text-green-400', name: 'groups' },
                { bg: 'bg-blue-600/15', ring: 'ring-blue-600/30', icon: 'text-blue-400', name: 'id' },
              ]
              const a = accents[i % accents.length]
              return (
                <div key={i} className={`p-4 rounded border border-white/10 ${a.bg} ring-1 ${a.ring}`}>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full grid place-content-center ${a.bg} ring-1 ${a.ring}`}>
                      <Icon name={a.name} className={`w-4 h-4 ${a.icon}`} />
                    </div>
                    <div className="text-3xl font-bold font-display leading-none"><CountUp value={s.value} /></div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {site.about?.aboutUs && (
        <Card>
          <h2 className="text-xl font-semibold">About Us</h2>
          <p className="text-white/80 mt-2">{site.about.aboutUs}</p>
        </Card>
      )}

      <Card>
        <h2 className="text-xl font-semibold">Club History</h2>
        <div className={`mt-2 grid gap-4 ${site.about?.kapOverlayImage ? 'sm:grid-cols-2 items-start' : ''}`}>
          <div className="space-y-3">
            {(site.about?.history || '').split(/\n\n+/).map((para, i) => (
              <p key={i} className="text-white/80">{para}</p>
            ))}
          </div>
          {site.about?.kapOverlayImage && (
            <div className="relative flex items-start justify-center">
              <div aria-hidden className="pointer-events-none absolute -top-6 -right-4 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-rose-500/15 blur-3xl" />
              <SmartImage
                src={site.about.kapOverlayImage}
                alt="Kap Arki"
                fit="contain"
                className="aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] rounded-lg border border-white/10 ring-1 ring-white/10 bg-white/5"
              />
            </div>
          )}
        </div>
      </Card>

  {false && site.about?.timeline}

      {/* Leadership grid */}
      {Array.isArray(site.about?.leadership) && site.about.leadership.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-3">Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {site.about.leadership.map((p, i) => (
              <div key={i} className="bg-white/5 rounded p-4 border border-white/10 text-center">
                <img src={p.photo} alt={p.name} className="w-24 h-24 object-cover rounded-full mx-auto" />
                <div className="mt-2 font-semibold">{p.name}</div>
                <div className="text-white/60 text-sm">{p.role}</div>
                <div className="flex justify-center gap-2 mt-2 text-xs">
                  {p.socials?.fb && <a className="btn btn-outline" href={p.socials.fb}>FB</a>}
                  {p.socials?.ig && <a className="btn btn-outline" href={p.socials.ig}>IG</a>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

  {false && site.about?.gallery}

      {/* Partners callout */}
      <Card>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-sm uppercase tracking-widest text-white/60">Supporters</div>
            <div className="text-lg font-semibold">Our Partners</div>
            <p className="text-white/70 text-sm">We collaborate with brands and organizations that share our values.</p>
          </div>
          <a href="/partners" className="btn btn-outline">View Partners</a>
        </div>
      </Card>

      {/* CTA band */}
      <Card>
        <div className="grid sm:grid-cols-2 items-center gap-4">
          <div>
            <div className="text-lg font-semibold">Ride with us.</div>
            <p className="text-white/70 text-sm">Join a nationwide family of ADV 160 owners—membership stays free.</p>
          </div>
          <div className="flex sm:justify-end gap-2">
            <a href="/login" className="btn btn-primary">Join the Club</a>
            <a href="/contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </Card>
      {Array.isArray(site.about?.coreValues) && site.about.coreValues.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-3">Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {site.about.coreValues.map((cv, i) => (
              <div key={i} className="bg-white/5 rounded p-3 border border-white/10">
                <div className="font-semibold">{cv.title}</div>
                <p className="text-white/80 mt-1 text-sm">{cv.text}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-xl font-semibold mb-2">Organizational Chart</h2>
  <Tree node={org} />
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-2">Roundtable / Core Groups</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-white/80">
          {['Road Captain', 'Safety Officer', 'Logistics', 'Public Relations', 'Media', 'Events'].map((r, i) => (
            <li key={i} className="bg-white/5 rounded p-2">{r}: Officer {i+1}</li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
