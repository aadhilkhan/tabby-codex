import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCheckoutStore } from '../../store/checkout-store'
import { Modal } from '../common/Modal'
import { Header } from './Header'

type CheckoutLayoutProps = {
  children: React.ReactNode
  cardClassName?: string
}

export function CheckoutLayout({ children, cardClassName }: CheckoutLayoutProps) {
  const [isCloseModalOpen, setCloseModalOpen] = useState(false)
  const resetFlow = useCheckoutStore((state) => state.resetFlow)
  const navigate = useNavigate()

  const leaveCheckout = () => {
    resetFlow()
    setCloseModalOpen(false)
    navigate('/otp', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)]">
      <Header onCloseRequest={() => setCloseModalOpen(true)} />

      <main className="px-4 pb-8 pt-6 sm:px-6 sm:pt-6">
        <section
          className={[
            'mx-auto w-full max-w-[500px] rounded-[24px] bg-[var(--card-bg)] py-8 shadow-[0_1px_1px_rgba(12,26,39,0.04)]',
            cardClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </section>
      </main>

      <Modal
        actionLabel="Leave checkout"
        onAction={leaveCheckout}
        onClose={() => setCloseModalOpen(false)}
        onSecondary={() => setCloseModalOpen(false)}
        open={isCloseModalOpen}
        secondaryLabel="Stay"
        title="Leave checkout?"
      >
        <p className="text-[16px] leading-[20px] tracking-[-0.16px] text-[var(--text-secondary)]">
          Your current progress will be cleared if you leave now.
        </p>
      </Modal>
    </div>
  )
}
