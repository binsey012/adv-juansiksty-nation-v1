import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'

export default function AdminGallery() {
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])

  useEffect(() => {
    import('../../data/gallery.json').then(mod => setPending(mod.default))
  }, [])

  const approve = (id) => {
    const item = pending.find(i => i.id === id)
    setPending(pending.filter(i => i.id !== id))
    setApproved([item, ...approved])
  }
  const reject = (id) => setPending(pending.filter(i => i.id !== id))

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Gallery Moderation (Mock)</h1>
        <div className="text-white/70 mt-1">Approve or reject user uploads.</div>
      </Card>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Pending</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {pending.map(i => (
              <div key={i.id} className="bg-white/5 rounded p-2">
                <img src={i.src} alt="" className="w-full h-24 object-cover rounded" />
                <div className="mt-1 flex gap-2">
                  <button className="btn btn-primary" onClick={()=>approve(i.id)}>Approve</button>
                  <button className="btn btn-outline" onClick={()=>reject(i.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Approved</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {approved.map(i => (
              <img key={i.id} src={i.src} alt="" className="w-full h-24 object-cover rounded" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
