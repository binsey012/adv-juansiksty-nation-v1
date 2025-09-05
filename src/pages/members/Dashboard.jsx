import Card from '../../components/Card.jsx'
import { useAuth } from '../../state/AuthContext.jsx'
import { useData } from '../../utils/useData.js'

export default function Dashboard() {
  const { user } = useAuth()
  const { data: news } = useData('news')
  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Welcome, {user?.name}</h1>
        <p className="text-white/70 mt-2">This is your members dashboard. Ride safe!</p>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Exclusive Announcements</h2>
        <ul className="list-disc pl-6 text-white/80 mt-2">
          {news.slice(0,3).map(n => <li key={n.id}>{n.title}</li>)}
        </ul>
      </Card>
    </div>
  )
}
