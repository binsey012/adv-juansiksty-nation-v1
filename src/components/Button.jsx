import clsx from 'clsx'

export default function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/60 disabled:opacity-60',
        variant === 'primary' && 'bg-primary text-white hover:bg-red-700',
        variant === 'outline' && 'border border-white/30 text-white hover:border-white/60',
        className,
      )}
      {...props}
    />
  )
}
