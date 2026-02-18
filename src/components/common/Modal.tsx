import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { PrimaryButton } from './PrimaryButton'

type ModalProps = {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  centerContent?: boolean
}

export function Modal({
  open,
  title,
  onClose,
  children,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  centerContent = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/60 p-4 sm:flex sm:items-center sm:justify-center" onMouseDown={onClose}>
      <section
        className={[
          'absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-[var(--card-bg)] px-6 pb-6 pt-6 shadow-xl sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:w-full sm:max-w-[500px] sm:rounded-[24px]',
          centerContent ? 'text-center' : '',
        ].join(' ')}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {title ? (
          <header className="pb-5">
            <h2 className="text-[30px] font-semibold leading-[32px] tracking-[-0.3px] text-[var(--text-primary)]">{title}</h2>
          </header>
        ) : null}

        {children}

        {(actionLabel || secondaryLabel) && (
          <footer className="mt-6 flex flex-col gap-2">
            {secondaryLabel ? (
              <button
                type="button"
                className="h-11 rounded-[12px] text-[16px] font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
                onClick={onSecondary}
              >
                {secondaryLabel}
              </button>
            ) : null}
            {actionLabel ? (
              <PrimaryButton type="button" onClick={onAction}>
                {actionLabel}
              </PrimaryButton>
            ) : null}
          </footer>
        )}
      </section>
    </div>,
    document.body,
  )
}
