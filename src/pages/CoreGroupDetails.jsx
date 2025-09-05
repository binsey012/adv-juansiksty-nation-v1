import { Link, useParams } from 'react-router-dom'
import Card from '../components/Card.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { useData } from '../utils/useData.js'
import { useAuth } from '../state/AuthContext.jsx'

export default function CoreGroupDetails() {
  const { slug } = useParams()
  const { data } = useData('chapters')
  const { user } = useAuth()
  const ch = data.find(c => c.slug === slug)
  if (!ch) return <div>Loading…</div>
  return (
    <div className="space-y-4">
      <Card>
        <div className="rounded overflow-hidden border border-white/10 bg-white/5">
          <SmartImage src={ch.image} alt="" layout="intrinsic" fit="contain" className="w-full" imgProps={{style:{width:'100%',height:'auto',maxHeight:'18rem',objectFit:'contain'}}} />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <div className="subheading">{ch.region}</div>
            <h1 className="heading">{ch.name}</h1>
          </div>
          {user && (
            <Link to={`/chapters/${ch.slug}`} className="btn btn-primary">Member View</Link>
          )}
        </div>
        <p className="text-white/80 mt-2">{ch.summary}</p>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Officers</h2>
        <ul className="list-disc pl-6 text-white/80">
          {ch.officers.map((o,i) => <li key={i}>{o}</li>)}
        </ul>
      </Card>
    </div>
  )
}
