import { formatCurrency } from '../../lib/currency'

type AmountSummaryProps = {
  orderAmount: number
  dueToday: number
}

export function AmountSummary({ orderAmount, dueToday }: AmountSummaryProps) {
  return (
    <div className="space-y-0.5 px-8 py-[6px]">
      <AmountLine label="Order amount" value={formatCurrency(orderAmount, 2)} />
      <AmountLine label="Due today" value={formatCurrency(dueToday, 2)} isStrong />
    </div>
  )
}

type AmountLineProps = {
  label: string
  value: string
  isStrong?: boolean
}

function AmountLine({ label, value, isStrong = false }: AmountLineProps) {
  return (
    <div className="flex items-end py-[6px]">
      <span
        className={[
          'flex-1 text-[16px] leading-[20px] tracking-[-0.16px]',
          isStrong ? 'font-bold text-[var(--text-primary)]' : 'font-medium text-[var(--text-secondary)]',
        ].join(' ')}
      >
        {label}
      </span>

      <span
        className={[
          'text-right text-[16px] leading-[20px] tracking-[-0.16px]',
          isStrong ? 'font-bold text-[var(--text-primary)]' : 'font-medium text-[var(--text-secondary)]',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}
