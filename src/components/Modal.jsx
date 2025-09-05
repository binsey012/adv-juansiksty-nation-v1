import { useEffect } from 'react'

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    if (open) {
      document.addEventListener('keydown', onKey)
      // Prevent background scroll when modal is open
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', onKey)
        document.body.style.overflow = prev
      }
    }
    return () => {}
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" tabIndex={-1}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 flex min-h-full items-start justify-center p-4">
        <div className="w-full max-w-3xl bg-zinc-900 border border-white/10 rounded-lg shadow-xl max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="sticky top-0 z-10 flex justify-end bg-zinc-900/90 backdrop-blur p-2 border-b border-white/10 rounded-t-lg">
            <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
