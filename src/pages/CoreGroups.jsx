import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../components/Card.jsx'
import Grid from '../components/Grid.jsx'
import PhMap from '../components/PhMap.jsx'
import SmartImage from '../components/SmartImage.jsx'
import Modal from '../components/Modal.jsx'
import { useData } from '../utils/useData.js'

export default function CoreGroups() {
  const { data } = useData('chapters')
  const regions = ['Luzon', 'Visayas', 'Mindanao']
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get('region') || ''
  const selected = regions.includes(param) ? param : '' // sanitize
  const grouped = useMemo(() => Object.fromEntries(regions.map(r => [r, data.filter(c => c.region === r)])), [data])
  const counts = useMemo(() => Object.fromEntries(regions.map(r => [r, grouped[r]?.length || 0])), [grouped])
  const [openCh, setOpenCh] = useState(null)
  const setSelected = (r) => {
    const next = new URLSearchParams(searchParams)
    if (!r || !regions.includes(r)) {
      next.delete('region')
    } else {
      next.set('region', r)
    }
    setSearchParams(next)
  }

  // Lazy section similar to Partners page for per-region tiles
  const LazyRegion = ({ region }) => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect() }
      }, { rootMargin: '200px' })
      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [])
    const items = grouped[region] || []
    const skeletons = Array.from({ length: 6 })
    const minSlots = 3
    const placeholders = Math.max(0, minSlots - Math.min(items.length, minSlots))
    return (
      <section ref={ref}>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl font-semibold">{region}</h2>
          <div className="text-white/60 text-sm">{counts[region]} group(s)</div>
        </div>
        <Grid cols={{ base: 1, sm: 2, lg: 3 }}>
          {!visible && skeletons.map((_, i) => (
            <div key={i} className="rounded-md h-40 bg-white/5 border border-white/10 animate-pulse" />
          ))}
          {visible && items.slice(0, minSlots).map(ch => (
            <Card key={ch.slug} className="overflow-hidden">
              <div className="relative rounded-md bg-white/5 border border-white/10 overflow-hidden">
                <button onClick={() => setOpenCh(ch)} className="block text-left w-full">
                  <SmartImage src={ch.image} alt="" layout="intrinsic" fit="contain" className="w-full" imgProps={{style:{width:'100%',height:'auto',maxHeight:'12rem',objectFit:'contain'}}} />
                </button>
              </div>
              <div className="text-lg font-semibold mt-2">{ch.name}</div>
              <p className="text-white/70 text-sm">{ch.summary}</p>
              <div className="text-xs text-white/60 mt-2">Officers: {ch.officers.join(', ')}</div>
              <div className="mt-3 flex gap-2">
                <Link className="btn btn-outline" to={`/core-groups/${ch.slug}`}>View details</Link>
                <button className="btn btn-primary" onClick={() => setOpenCh(ch)}>Quick view</button>
              </div>
            </Card>
          ))}
          {visible && placeholders > 0 && Array.from({ length: placeholders }).map((_, i) => (
            <Card key={`placeholder-${i}`} className="overflow-hidden border-dashed">
              <div className="rounded-md h-40 bg-white/5 border border-dashed border-white/15 grid place-content-center text-white/50">
                Coming soon
              </div>
              <div className="text-sm text-white/60 mt-2">New core group slot</div>
            </Card>
          ))}
          {visible && items.length === 0 && (
            <Card className="col-span-full">
              <div className="text-white/70 text-sm">No groups listed for {region} yet.</div>
            </Card>
          )}
        </Grid>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero with mini PH segmentation and counts */}
      <section className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-tr from-zinc-900 to-black">
        <div className="absolute inset-0 opacity-15" style={{backgroundImage:'url(https://images.unsplash.com/photo-1520975922284-233ca9b3af8b?q=80&w=2069&auto=format&fit=crop)', backgroundSize:'cover', backgroundPosition:'center'}} />
        <div className="relative z-10 p-6 sm:p-10 grid gap-6 sm:grid-cols-2 items-center">
          <div>
            <div className="subheading">Core Groups • Philippines</div>
            <h1 className="heading mt-1">Core Groups by Region</h1>
            <p className="text-white/80 mt-2 max-w-2xl">Discover our core groups across the archipelago—Luzon, Visayas, and Mindanao. Connect with officers, join rides, and meet members near you.</p>
            <div className="mt-4 inline-flex flex-wrap gap-2">
              <button onClick={() => setSelected('')} className={`btn ${!selected ? 'btn-primary' : 'btn-outline'}`}>All</button>
              {regions.map(r => (
                <button key={r} onClick={() => setSelected(r)} className={`btn ${selected===r ? 'btn-primary' : 'btn-outline'}`}>{r} ({counts[r]})</button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <PhMap counts={counts} selected={selected} onSelect={(r) => setSelected(r === selected ? '' : r)} />
          </div>
        </div>
      </section>

      {(selected ? [selected] : regions).map(region => (
        <LazyRegion key={region} region={region} />
      ))}

      {/* Quick View Modal */}
  <Modal open={!!openCh} onClose={() => setOpenCh(null)}>
        {openCh && (
          <div className="space-y-3">
            <div className="text-lg font-semibold">{openCh.name} <span className="text-white/50 text-sm">• {openCh.region}</span></div>
            <div className="rounded-md overflow-hidden border border-white/10 bg-white/5">
      <SmartImage src={openCh.image} alt={openCh.name} className="w-full" layout="intrinsic" fit="contain" imgProps={{style:{width:'100%',height:'auto',maxHeight:'18rem',objectFit:'contain'}}} />
            </div>
            <p className="text-white/80 text-sm">{openCh.summary}</p>
            <div>
              <div className="font-semibold mb-1">Officers</div>
              <ul className="list-disc pl-6 text-white/80 text-sm">
                {openCh.officers.map((o,i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
            <div className="flex gap-2">
              <Link className="btn btn-outline" to={`/core-groups/${openCh.slug}`}>Open details</Link>
              <button className="btn" onClick={() => setOpenCh(null)}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
