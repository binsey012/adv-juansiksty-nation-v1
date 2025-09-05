import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'

export default function AdminNews() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', excerpt: '', image: '', date: new Date().toISOString() })

  useEffect(() => {
    import('../../data/news.json').then(mod => setItems(mod.default))
  }, [])

  const add = (e) => {
    e.preventDefault()
    setItems(prev => [{ id: Date.now(), ...form }, ...prev])
    setForm({ title: '', excerpt: '', image: '', date: new Date().toISOString() })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">News Management (Mock)</h1>
        <form onSubmit={add} className="grid sm:grid-cols-2 gap-2 mt-3">
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <input value={form.image} onChange={e=>setForm({...form, image:e.target.value})} placeholder="Image URL" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <input value={form.excerpt} onChange={e=>setForm({...form, excerpt:e.target.value})} placeholder="Excerpt" className="sm:col-span-2 rounded bg-white/10 border border-white/10 px-3 py-2" />
          <button className="btn btn-primary sm:col-span-2">Add</button>
        </form>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(n => (
          <Card key={n.id}>
            <img src={n.image} alt="" className="w-full h-36 object-cover rounded" />
            <div className="text-xs text-white/60 mt-2">{new Date(n.date).toLocaleDateString()}</div>
            <div className="font-semibold">{n.title}</div>
            <p className="text-white/70">{n.excerpt}</p>
            <button className="btn btn-outline mt-2" onClick={()=>remove(n.id)}>Delete</button>
          </Card>
        ))}
      </div>
    </div>
  )
}
