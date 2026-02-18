import type { CSSProperties } from 'react'

type SpinnerProps = {
  size?: number
  className?: string
}

export function Spinner({ size = 18, className }: SpinnerProps) {
  const style = {
    width: size,
    height: size,
  } satisfies CSSProperties

  return (
    <span
      aria-label="Loading"
      className={`inline-block rounded-full border-2 border-white/35 border-t-white align-middle animate-spin-slow ${className ?? ''}`}
      style={style}
    />
  )
}
