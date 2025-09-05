import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'

export default function AdminEvents() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', location: '', date: new Date().toISOString().slice(0,10), description: '' })

  useEffect(() => {
    import('../../data/events.json').then(mod => setItems(mod.default))
  }, [])

  const add = (e) => {
    e.preventDefault()
    setItems(prev => [{ id: Date.now(), ...form }, ...prev])
    setForm({ title: '', location: '', date: new Date().toISOString().slice(0,10), description: '' })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Events Management (Mock)</h1>
        <form onSubmit={add} className="grid sm:grid-cols-2 gap-2 mt-3">
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Location" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="sm:col-span-2 rounded bg-white/10 border border-white/10 px-3 py-2" />
          <button className="btn btn-primary sm:col-span-2">Add</button>
        </form>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(n => (
          <Card key={n.id}>
            <div className="text-xs text-white/60">{new Date(n.date).toLocaleDateString()} • {n.location}</div>
            <div className="font-semibold">{n.title}</div>
            <p className="text-white/70">{n.description}</p>
            <button className="btn btn-outline mt-2" onClick={()=>remove(n.id)}>Delete</button>
          </Card>
        ))}
      </div>
    </div>
  )
}
