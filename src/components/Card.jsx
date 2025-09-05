import clsx from 'clsx'

export default function Card({ children, className }) {
  return (
    <div className={clsx('card-dark p-4', className)}>
      {children}
    </div>
  )
}
