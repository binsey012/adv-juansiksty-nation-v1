import Card from '../../components/Card.jsx'
import { useData } from '../../utils/useData.js'

export default function AdminDashboard() {
  const { data: members } = useData('members.json')
  const { data: partners } = useData('partners.json')
  const { data: news } = useData('news.json')
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <Card><div className="text-sm text-white/60">Members</div><div className="text-3xl font-bold">{members.length}</div></Card>
      <Card><div className="text-sm text-white/60">Partners</div><div className="text-3xl font-bold">{partners.length}</div></Card>
      <Card><div className="text-sm text-white/60">News Posts</div><div className="text-3xl font-bold">{news.length}</div></Card>
    </div>
  )
}
