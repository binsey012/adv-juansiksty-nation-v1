import { useParams } from 'react-router-dom'
import Card from '../../components/Card.jsx'
import { useData } from '../../utils/useData.js'

export default function ChapterPage() {
  const { slug } = useParams()
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  const { data: members } = useData('members')
  const list = members.filter(m => m.chapter.toLowerCase() === name.toLowerCase())
  return (
    <div className="space-y-3">
      <Card>
        <h1 className="heading">Chapter: {name}</h1>
        <p className="text-white/70 mt-2">Officers and members list (dummy).</p>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Officers</h2>
        <ul className="list-disc pl-6 text-white/80">
          {['Captain', 'Lieutenant', 'Secretary'].map((t, i) => <li key={i}>{t} {name}</li>)}
        </ul>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Members</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {list.map(m => <li key={m.id} className="bg-white/5 rounded p-2">{m.name} • {m.bike}</li>)}
        </ul>
      </Card>
    </div>
  )
}
