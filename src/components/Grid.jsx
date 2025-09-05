export default function Grid({ children, cols = { base: 1, sm: 2, lg: 3 }, className = '' }) {
  const base = cols.base === 1 ? 'grid-cols-1' : cols.base === 2 ? 'grid-cols-2' : 'grid-cols-3'
  const sm = cols.sm === 1 ? 'sm:grid-cols-1' : cols.sm === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
  const lg = cols.lg === 1 ? 'lg:grid-cols-1' : cols.lg === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  return <div className={`grid ${base} ${sm} ${lg} gap-4 ${className}`}>{children}</div>
}
