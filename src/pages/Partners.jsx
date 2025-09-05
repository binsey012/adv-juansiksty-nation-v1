import { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../components/Card.jsx'
import Modal from '../components/Modal.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { useData } from '../utils/useData.js'

export default function Partners() {
  const { data: partners } = useData('partners')
  const [openCTA, setOpenCTA] = useState(false)
  const base = (import.meta?.env?.BASE_URL || '/').replace(/\/$/, '')
  const resolve = (p) => (p && typeof p === 'string' && p.startsWith('/') ? base + p : p)

  const groups = useMemo(() => ({
    National: partners.filter(p => p.category === 'National'),
    'Special Events': partners.filter(p => p.category === 'Special Events'),
    'Core Group': partners.filter(p => p.category === 'Core Group'),
  }), [partners])

  const LazySection = ({ title, items }) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      }, { rootMargin: '200px' })
      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [])
    const skeletons = Array.from({ length: 8 })
    return (
      <section ref={ref} className="space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Card>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {!visible && skeletons.map((_, i) => (
              <div key={i} className="rounded-md h-32 bg-white/5 border border-white/10 animate-pulse" />
            ))}
            {visible && items.map(p => {
              const tile = (
                <div className="relative rounded-md h-32 grid place-content-center bg-white/5 border border-white/10 overflow-hidden px-4">
                  {/* Mask overlay to aid contrast on varying logos */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 mix-blend-overlay" />
                  <SmartImage
                    src={p.logo}
                    alt={p.name}
                    layout="intrinsic"
                    fit="contain"
                    className="w-full"
                    imgProps={{ style: { width: '100%', height: 'auto', maxHeight: '6rem', objectFit: 'contain' } }}
                  />
                </div>
              )
              return (
                <div key={p.id} title={p.name}>
                  {p.url ? <a href={p.url} target="_blank" rel="noreferrer">{tile}</a> : tile}
                </div>
              )
            })}
            {visible && items.length === 0 && (
              <div className="col-span-full text-white/60 text-sm">No partners yet. Add logos by uploading images to public/images/partners and referencing them in src/data/partners.json.</div>
            )}
          </div>
        </Card>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="heading">Partners</h1>

  <LazySection title="National Partners (Brands/Shops/Partners)" items={groups.National} />
  <LazySection title="Special Events Partners" items={groups['Special Events']} />
  <LazySection title="Core Group Level Partners" items={groups['Core Group']} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">For Partnership</h2>
        <Card>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <div>
              <div className="text-white/70 text-sm">Partner with us to support riders nationwide and reach a passionate community.</div>
              <button className="btn btn-primary mt-3" onClick={() => setOpenCTA(true)}>Become a Partner</button>
            </div>
            <div className="rounded-md overflow-hidden border border-white/10 bg-white/5">
              <SmartImage src={resolve('/images/partners/partnership/partner-with-us.jpg')} alt="Partner With Us" className="w-full h-48" fit="contain" />
            </div>
          </div>
        </Card>
      </section>

      <Modal open={openCTA} onClose={() => setOpenCTA(false)}>
        <div className="space-y-3">
          <div className="text-lg font-semibold">Become a Partner</div>
          <div className="rounded-md overflow-hidden border border-white/10 bg-white/5">
            <SmartImage src={resolve('/images/partners/partnership/partner-with-us-modal.jpg')} alt="Partner With Us" className="w-full" fit="contain" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
