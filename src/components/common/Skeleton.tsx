import type { ReactNode } from 'react'

type SkeletonBlockProps = {
  className?: string
}

export function SkeletonBlock({ className }: SkeletonBlockProps) {
  return <div className={`animate-pulse-sheen rounded-xl bg-[#d9e0e7] dark:bg-[#2a3440] ${className ?? ''}`} />
}

type SkeletonPageProps = {
  children?: ReactNode
}

export function SkeletonPage({ children }: SkeletonPageProps) {
  return <div className="space-y-4">{children}</div>
}
