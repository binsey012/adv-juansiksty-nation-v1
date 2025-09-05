import { useState } from 'react'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login() {
  const { login, register, loginAs, user } = useAuth()
  const [name, setName] = useState(user?.name || '')

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <h1 className="heading">Login / Register (Mock)</h1>
        <div className="mt-3 space-y-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full rounded bg-white/10 border border-white/10 px-3 py-2" />
          <div className="flex gap-2 flex-wrap">
            <Button onClick={()=>login(name || 'Member', 'member')}>Login as Member</Button>
            <Button variant="outline" onClick={()=>login(name || 'Admin', 'admin')}>Login as Admin</Button>
            <Button variant="outline" onClick={()=>register(name || 'New Rider')}>Register (Mock)</Button>
          </div>
        </div>
        {user && (
          <div className="mt-4 text-sm text-white/70">Currently logged in as: {user.name} ({user.role}). You can switch roles for testing:</div>
        )}
        <div className="mt-2 flex gap-2 flex-wrap">
          <Button variant="outline" onClick={()=>loginAs('member')}>Become Member</Button>
          <Button variant="outline" onClick={()=>loginAs('admin')}>Become Admin</Button>
        </div>
      </Card>
    </div>
  )
}
