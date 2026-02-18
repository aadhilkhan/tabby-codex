import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { Spinner } from './Spinner'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  loading?: boolean
}

export function PrimaryButton({ children, loading = false, disabled, className, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        'h-16 w-full rounded-[16px] px-6 text-[30px] font-semibold tracking-[-0.3px] text-white transition-all duration-200 ease-out',
        'bg-gradient-to-r from-[#1f2630] to-[#1b2531] shadow-[0_2px_8px_rgba(11,16,23,0.18)]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="inline-flex items-center justify-center gap-2 text-[28px] leading-[24px]">
        {loading ? <Spinner /> : null}
        {children}
      </span>
    </button>
  )
}
