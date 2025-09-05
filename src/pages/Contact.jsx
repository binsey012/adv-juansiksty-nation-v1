import Card from '../components/Card.jsx'
import { useData } from '../utils/useData.js'

export default function Contact() {
  const { data: site } = useData('site')
  const contact = site.contact || {}
  const onSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    console.log('Contact form submit (mock):', data)
    alert('Submitted to console (mock).')
  }
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <h1 className="heading mb-3">Contact Us</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input name="name" placeholder="Your name" className="w-full rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <input type="email" name="email" placeholder="Email" className="w-full rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <textarea name="message" placeholder="Message" rows={5} className="w-full rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <button className="btn btn-primary">Send</button>
        </form>
      </Card>
      <div className="space-y-3">
        <Card>
          <div className="text-white/80">Google Maps (placeholder)</div>
          <img src={contact.mapImage || ''} alt="Map" className="w-full h-64 object-contain opacity-60" />
        </Card>
        <Card>
          <div className="text-white/80">Socials</div>
          <div className="flex gap-3 mt-2">
            {(contact.socials || []).map((s, i) => (
              <a key={i} href={s.url} className="btn btn-outline">{s.label}</a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
