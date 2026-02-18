import type { InstallmentCount } from '../../types/checkout'

type PlanPillGroupProps = {
  plans: InstallmentCount[]
  selected: InstallmentCount
  onSelect: (installments: InstallmentCount) => void
}

export function PlanPillGroup({ plans, selected, onSelect }: PlanPillGroupProps) {
  return (
    <div className="flex flex-wrap gap-2 px-8 pb-2">
      {plans.map((plan) => {
        const isSelected = plan === selected

        return (
          <button
            key={plan}
            className={[
              'h-10 min-w-[66px] rounded-[20px] px-5 text-[16px] font-medium leading-[20px] tracking-[-0.16px] transition',
              isSelected
                ? 'bg-[#1f2731] text-white'
                : 'bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[#d7dfe7] dark:hover:bg-[#364251]',
            ].join(' ')}
            onClick={() => onSelect(plan)}
            type="button"
          >
            {plan}
          </button>
        )
      })}
    </div>
  )
}
