import { useEffect, useState } from 'react'
import Card from '../../components/Card.jsx'
import Modal from '../../components/Modal.jsx'
import Button from '../../components/Button.jsx'
import { useData } from '../../utils/useData.js'

export default function Gallery() {
  const { data } = useData('gallery')
  const [items, setItems] = useState([])
  useEffect(() => { setItems(data) }, [data])
  const [preview, setPreview] = useState(null)

  const onUpload = (e) => {
    e.preventDefault()
    const f = e.currentTarget.image?.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    const newItem = { id: Date.now(), src: url, title: f.name }
    setItems(prev => [newItem, ...prev])
    alert('Upload submitted (mock).')
  }

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="heading">Gallery</h1>
        <form className="mt-3 flex items-center gap-2" onSubmit={onUpload}>
          <input type="file" name="image" accept="image/*" className="file:mr-3 file:px-3 file:py-2 file:rounded file:border-0 file:bg-white/10 file:text-white" />
          <Button>Upload (Mock)</Button>
        </form>
      </Card>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map(img => (
          <button key={img.id} className="group relative" onClick={()=>setPreview(img)}>
            <img src={img.src} alt={img.title} className="w-full h-36 object-cover rounded" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition grid place-content-center">🔍</div>
          </button>
        ))}
      </div>
      <Modal open={!!preview} onClose={()=>setPreview(null)}>
        {preview && (
          <div>
            <img src={preview.src} alt={preview.title} className="w-full max-h-[70vh] object-contain" />
            <div className="mt-2 text-center text-white/80">{preview.title}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
