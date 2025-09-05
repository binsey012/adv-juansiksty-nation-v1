import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'
import Table from '../../components/Table.jsx'

export default function AdminMembers() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', handle: '', chapter: 'Tarlaqueños RT', bike: '' })

  useEffect(() => {
    import('../../data/members.json').then(mod => setItems(mod.default))
  }, [])

  const add = (e) => {
    e.preventDefault()
    setItems(prev => [{ id: Date.now(), ...form }, ...prev])
  setForm({ name: '', handle: '', chapter: 'Tarlaqueños RT', bike: '' })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Members & Chapters (Mock)</h1>
        <form onSubmit={add} className="grid sm:grid-cols-4 gap-2 mt-3">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <input value={form.handle} onChange={e=>setForm({...form, handle:e.target.value})} placeholder="Handle" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <select value={form.chapter} onChange={e=>setForm({...form, chapter:e.target.value})} className="rounded bg-white/10 border border-white/10 px-3 py-2">
            {['Tarlaqueños RT','Bravo','Charlie'].map(c => <option key={c}>{c}</option>)}
          </select>
          <input value={form.bike} onChange={e=>setForm({...form, bike:e.target.value})} placeholder="Bike" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <button className="btn btn-primary sm:col-span-4">Add</button>
        </form>
      </Card>
      <Card>
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'handle', header: 'Handle' },
            { key: 'chapter', header: 'Chapter' },
            { key: 'bike', header: 'Bike' },
            { key: 'id', header: 'Actions', render: (v, row) => <button className="btn btn-outline" onClick={()=>remove(row.id)}>Delete</button> },
          ]}
          data={items}
        />
      </Card>
    </div>
  )
}
