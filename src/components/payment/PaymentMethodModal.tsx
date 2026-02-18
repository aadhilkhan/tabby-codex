import applePayIcon from '../../assets/payment/apple-pay.svg'
import mastercardIcon from '../../assets/payment/mastercard.svg'
import type { PaymentMethodId } from '../../types/checkout'
import { Modal } from '../common/Modal'

type PaymentMethodModalProps = {
  open: boolean
  selectedMethod: PaymentMethodId
  onSelectMethod: (method: PaymentMethodId) => void
  onClose: () => void
}

export function PaymentMethodModal({ open, selectedMethod, onSelectMethod, onClose }: PaymentMethodModalProps) {
  return (
    <Modal actionLabel="Continue" onAction={onClose} onClose={onClose} open={open} title="Select payment method">
      <ul className="space-y-1 pb-1">
        <li>
          <button
            className="flex w-full items-center gap-4 rounded-[14px] px-2 py-3 text-left transition hover:bg-[var(--surface-muted)]"
            onClick={() => onSelectMethod('apple-pay')}
            type="button"
          >
            <img alt="Apple Pay" className="h-5 w-7 shrink-0" src={applePayIcon} />
            <span className="flex-1 text-[32px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Apple Pay</span>
            <Radio checked={selectedMethod === 'apple-pay'} />
          </button>
        </li>

        <li>
          <button
            className="flex w-full items-center gap-4 rounded-[14px] px-2 py-3 text-left transition hover:bg-[var(--surface-muted)]"
            onClick={() => onSelectMethod('debit-card')}
            type="button"
          >
            <img alt="Debit card" className="h-5 w-7 shrink-0" src={mastercardIcon} />
            <span className="flex-1">
              <span className="block text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-secondary)]">Debit Card</span>
              <span className="block text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">•••• 1234</span>
            </span>
            <Radio checked={selectedMethod === 'debit-card'} />
          </button>
        </li>

        <li>
          <button className="flex w-full items-center gap-4 rounded-[14px] px-2 py-3 text-left transition hover:bg-[var(--surface-muted)]" type="button">
            <span className="inline-flex h-5 w-7 items-center justify-center rounded-[4px] border border-[var(--line-primary)] text-[18px] leading-none text-[var(--text-primary)]">
              +
            </span>
            <span className="flex-1 text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Add new card</span>
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 7L15 12L10 17" stroke="var(--text-secondary)" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </li>
      </ul>
    </Modal>
  )
}

type RadioProps = {
  checked: boolean
}

function Radio({ checked }: RadioProps) {
  return (
    <span
      aria-hidden
      className={[
        'inline-flex h-6 w-6 items-center justify-center rounded-full border',
        checked ? 'border-[#1f2731] bg-[#1f2731]' : 'border-[var(--line-primary)] bg-[var(--surface-muted)]',
      ].join(' ')}
    >
      {checked ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
    </span>
  )
}
