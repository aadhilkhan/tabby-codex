import cashbackIcon from '../../assets/payment/cashback.svg'
import applePayIcon from '../../assets/payment/apple-pay.svg'
import mastercardIcon from '../../assets/payment/mastercard.svg'
import { formatCurrency } from '../../lib/currency'
import type { PaymentMethodId } from '../../types/checkout'

type PaymentMethodSectionProps = {
  selectedMethod: PaymentMethodId
  cashbackApplied: boolean
  cashbackBalance: number
  onOpenMethodModal: () => void
  onToggleCashback: () => void
}

export function PaymentMethodSection({
  selectedMethod,
  cashbackApplied,
  cashbackBalance,
  onOpenMethodModal,
  onToggleCashback,
}: PaymentMethodSectionProps) {
  const methodLabel = selectedMethod === 'apple-pay' ? 'Apple Pay' : 'Debit Card'
  const methodSecondary = selectedMethod === 'apple-pay' ? '' : '•••• 1234'
  const methodIcon = selectedMethod === 'apple-pay' ? applePayIcon : mastercardIcon

  return (
    <section className="px-8">
      <h2 className="pb-1 text-[16px] font-bold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Payment method</h2>
      <p className="pb-2 text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-secondary)]">
        This will become your default method for future repayments on all of your purchases
      </p>

      <button
        className="flex w-full items-center gap-4 rounded-[16px] px-2 py-3 text-left transition hover:bg-[var(--surface-muted)]"
        onClick={onOpenMethodModal}
        type="button"
      >
        <img alt={methodLabel} className="h-5 w-7 shrink-0" src={methodIcon} />
        <span className="flex-1">
          <span className="block text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-secondary)]">{methodLabel}</span>
          {methodSecondary ? (
            <span className="block text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">{methodSecondary}</span>
          ) : null}
        </span>
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 7L15 12L10 17" stroke="var(--text-secondary)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </button>

      <div className="flex items-center gap-4 rounded-[16px] px-2 py-3">
        <img alt="Cashback" className="h-10 w-10 shrink-0" src={cashbackIcon} />
        <span className="flex-1">
          <span className="block text-[32px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Cashback balance</span>
          <span className="block text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-secondary)]">
            Use {formatCurrency(cashbackBalance, 2)}
          </span>
        </span>

        <button
          aria-label="Toggle cashback"
          className={[
            'relative inline-flex h-6 w-[36px] items-center rounded-full border transition',
            cashbackApplied ? 'border-[#1f2731] bg-[#1f2731]' : 'border-[var(--line-primary)] bg-[var(--surface-muted)]',
          ].join(' ')}
          onClick={onToggleCashback}
          type="button"
        >
          <span
            className={[
              'absolute h-4 w-4 rounded-full bg-white transition-transform',
              cashbackApplied ? 'translate-x-[17px]' : 'translate-x-[2px]',
            ].join(' ')}
          />
        </button>
      </div>
    </section>
  )
}
