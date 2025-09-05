import { useState } from 'react'
import Card from '../../components/Card.jsx'
import Table from '../../components/Table.jsx'

export default function AdminDirectory() {
  const [items, setItems] = useState([
    { id: 1, type: 'Hospital', name: 'St. Michael Hospital', phone: '0917 000 0000' },
    { id: 2, type: 'Shop', name: 'MotoFix Service', phone: '0917 111 2222' },
    { id: 3, type: 'Emergency', name: 'PNP Hotline', phone: '911' },
  ])
  const [form, setForm] = useState({ type: 'Hospital', name: '', phone: '' })

  const add = (e) => {
    e.preventDefault()
    setItems(prev => [{ id: Date.now(), ...form }, ...prev])
    setForm({ type: 'Hospital', name: '', phone: '' })
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Map / Emergency Directory (Mock)</h1>
        <form onSubmit={add} className="grid sm:grid-cols-3 gap-2 mt-3">
          <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="rounded bg-white/10 border border-white/10 px-3 py-2">
            {['Hospital','Shop','Emergency'].map(t => <option key={t}>{t}</option>)}
          </select>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="rounded bg-white/10 border border-white/10 px-3 py-2" required />
          <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="rounded bg-white/10 border border-white/10 px-3 py-2" />
          <button className="btn btn-primary sm:col-span-3">Add</button>
        </form>
      </Card>
      <Card>
        <Table
          columns={[
            { key: 'type', header: 'Type' },
            { key: 'name', header: 'Name' },
            { key: 'phone', header: 'Phone' },
            { key: 'id', header: 'Actions', render: (v, row) => <button className="btn btn-outline" onClick={()=>remove(row.id)}>Delete</button> },
          ]}
          data={items}
        />
      </Card>
    </div>
  )
}
