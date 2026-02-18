import planSplitIcon from '../../assets/icons/plan-split.svg'
import { formatCurrency } from '../../lib/currency'
import { getPlanSubtitle } from '../../lib/plans'
import type { PlanBreakdown } from '../../types/checkout'

type PlanSummaryRowProps = {
  plan: PlanBreakdown
  onOpenSchedule: () => void
  showBadge?: string
}

export function PlanSummaryRow({ plan, onOpenSchedule, showBadge }: PlanSummaryRowProps) {
  return (
    <button
      className="mx-6 flex w-[calc(100%-48px)] items-center gap-3 rounded-[16px] px-2 py-2 text-left transition hover:bg-[var(--surface-muted)]"
      onClick={onOpenSchedule}
      type="button"
    >
      <img alt="Plan" className="h-10 w-10 shrink-0" src={planSplitIcon} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[32px] font-semibold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">
            {formatCurrency(plan.monthlyPayment, 2)}/mo
          </p>

          {showBadge ? (
            <span className="inline-flex items-center rounded-full bg-[#ece2ff] px-2 py-0.5 text-[12px] font-medium leading-4 tracking-[-0.13px] text-[#7E48F3]">
              {showBadge}
            </span>
          ) : null}
        </div>

        <p
          className={[
            'text-[14px] font-medium leading-[18px] tracking-[-0.16px]',
            plan.serviceFee === 0 ? 'text-[#179958]' : 'text-[var(--text-secondary)]',
          ].join(' ')}
        >
          {getPlanSubtitle(plan)}
        </p>
      </div>

      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 7L15 12L10 17" stroke="var(--text-secondary)" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </button>
  )
}
