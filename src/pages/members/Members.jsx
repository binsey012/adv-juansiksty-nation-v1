import { useMemo, useState } from 'react'
import Card from '../../components/Card.jsx'
import Table from '../../components/Table.jsx'
import { useData } from '../../utils/useData.js'

const chapters = ['All', 'Tarlaqueños RT', 'Bravo', 'Charlie']

export default function Members() {
  const { data } = useData('members')
  const [q, setQ] = useState('')
  const [ch, setCh] = useState('All')

  const filtered = useMemo(() => {
    return data.filter(m =>
      (ch === 'All' || m.chapter === ch) &&
      (m.name.toLowerCase().includes(q.toLowerCase()) || m.handle.toLowerCase().includes(q.toLowerCase()))
    )
  }, [data, q, ch])

  return (
    <div className="space-y-3">
      <Card>
        <h1 className="heading mb-3">Members Directory</h1>
        <div className="flex gap-2 flex-wrap mb-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name or handle" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          {chapters.map(c => (
            <button key={c} onClick={()=>setCh(c)} className={`btn ${ch===c? 'btn-primary':'btn-outline'}`}>{c}</button>
          ))}
        </div>
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'handle', header: 'Handle' },
            { key: 'chapter', header: 'Chapter' },
            { key: 'bike', header: 'Bike' },
          ]}
          data={filtered}
        />
      </Card>
    </div>
  )
}
