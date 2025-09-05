import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'

export default function AdminPartners() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', category: 'Shops', logo: '' })

  useEffect(() => {
    import('../../data/partners.json').then(mod => setItems(mod.default))
  }, [])

  const add = (e) => {
    e.preventDefault()
    setItems(prev => [{ id: Date.now(), ...form }, ...prev])
    setForm({ name: '', category: 'Shops', logo: '' })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Partners Management (Mock)</h1>
        <form onSubmit={add} className="grid sm:grid-cols-3 gap-2 mt-3">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="rounded bg-white/10 border border-white/10 px-3 py-2">
            {['Shops','Hospitals','Sponsors'].map(c => <option key={c}>{c}</option>)}
          </select>
          <input value={form.logo} onChange={e=>setForm({...form, logo:e.target.value})} placeholder="Logo URL" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <button className="btn btn-primary sm:col-span-3">Add</button>
        </form>
      </Card>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map(p => (
          <div key={p.id} className="bg-white rounded p-3">
            <img src={p.logo} alt={p.name} className="h-12 object-contain" />
            <div className="mt-2 text-sm font-semibold">{p.name}</div>
            <div className="text-xs text-gray-600">{p.category}</div>
            <button className="btn btn-outline mt-2" onClick={()=>remove(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
