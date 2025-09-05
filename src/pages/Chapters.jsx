import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import Grid from '../components/Grid.jsx'
import { useData } from '../utils/useData.js'

export default function Chapters() {
  const { data } = useData('chapters')
  const regions = ['Luzon', 'Visayas', 'Mindanao']
  const grouped = Object.fromEntries(regions.map(r => [r, data.filter(c => c.region === r)]))
  return (
    <div className="space-y-6">
      <h1 className="heading">Chapters in the Philippines</h1>
      {regions.map(region => (
        <section key={region}>
          <h2 className="text-xl font-semibold mb-3">{region}</h2>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }}>
            {grouped[region].map(ch => (
              <Card key={ch.slug}>
                <img src={ch.image} alt="" className="w-full h-40 object-cover rounded" />
                <div className="text-lg font-semibold mt-2">{ch.name}</div>
                <p className="text-white/70 text-sm">{ch.summary}</p>
                <div className="text-xs text-white/60 mt-2">Officers: {ch.officers.join(', ')}</div>
                <div className="mt-3">
                  <Link className="btn btn-outline" to={`/chapters/${ch.slug}`}>View chapter</Link>
                </div>
              </Card>
            ))}
          </Grid>
        </section>
      ))}
    </div>
  )
}
