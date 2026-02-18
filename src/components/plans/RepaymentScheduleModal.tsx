import { formatCurrency } from '../../lib/currency'
import { getRepaymentSchedule } from '../../lib/plans'
import type { PlanBreakdown } from '../../types/checkout'
import { Modal } from '../common/Modal'

import planSplitIcon from '../../assets/icons/plan-split.svg'

type RepaymentScheduleModalProps = {
  open: boolean
  plan: PlanBreakdown
  onClose: () => void
}

export function RepaymentScheduleModal({ open, plan, onClose }: RepaymentScheduleModalProps) {
  const schedule = getRepaymentSchedule(plan)

  return (
    <Modal actionLabel="Got it" onAction={onClose} onClose={onClose} open={open}>
      <div className="space-y-4">
        <header className="flex items-center gap-3 px-2">
          <img alt="Plan" className="h-10 w-10" src={planSplitIcon} />
          <h3 className="text-[35px] font-semibold leading-[36px] tracking-[-0.35px] text-[var(--text-primary)]">Pay in {plan.installments}</h3>
        </header>

        <div className="h-px w-full bg-[var(--line-muted)]" />

        <section className="space-y-1 px-2">
          <h4 className="text-[16px] font-bold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Repayment schedule</h4>
          <p className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[#179958]">
            {plan.serviceFee === 0 ? 'No interest. No fees.' : `Total fee ${formatCurrency(plan.serviceFee, 2)}`}
          </p>
        </section>

        <ol className="space-y-3 px-2">
          {schedule.map((step, index) => (
            <li key={`${step.label}-${index}`} className="grid grid-cols-[18px_1fr_auto] items-center gap-3">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span
                  className={[
                    'inline-block h-2.5 w-2.5 rounded-full border',
                    step.isToday ? 'border-[#16BA7A] bg-[#D7F5E8]' : 'border-[var(--line-primary)] bg-transparent',
                  ].join(' ')}
                />
                {index < schedule.length - 1 ? (
                  <span className="absolute top-4 h-6 w-[2px] rounded-full bg-[var(--line-muted)]" />
                ) : null}
              </span>

              <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">{step.label}</span>
              <span className="text-[32px] font-semibold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">
                {formatCurrency(step.amount)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Modal>
  )
}
