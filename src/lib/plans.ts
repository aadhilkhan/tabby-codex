import type { InstallmentCount, PlanBreakdown, PlanOption, RepaymentStep } from '../types/checkout'
import { formatCurrency, roundMoney } from './currency'

export const PLAN_ORDER: InstallmentCount[] = [12, 10, 8, 6, 4]

export const PLAN_OPTIONS: PlanOption[] = [
  { installments: 4, serviceFee: 0, badge: 'Pay in 4' },
  { installments: 6, serviceFee: 80 },
  { installments: 8, serviceFee: 120 },
  { installments: 10, serviceFee: 180 },
  { installments: 12, serviceFee: 272 },
]

export function getPlanOption(installments: InstallmentCount) {
  const option = PLAN_OPTIONS.find((item) => item.installments === installments)

  if (!option) {
    throw new Error(`Unsupported installment plan: ${installments}`)
  }

  return option
}

export function getPlanBreakdown(orderAmount: number, installments: InstallmentCount): PlanBreakdown {
  const planOption = getPlanOption(installments)
  const baseTotal = roundMoney(orderAmount + planOption.serviceFee)
  const monthlyPayment = roundMoney(baseTotal / installments)
  const totalPayable = roundMoney(monthlyPayment * installments)
  const serviceFee = roundMoney(totalPayable - orderAmount)

  return {
    installments,
    serviceFee,
    monthlyPayment,
    totalPayable,
    dueToday: monthlyPayment,
  }
}

export function getPlanSubtitle(plan: PlanBreakdown) {
  if (plan.serviceFee <= 0) {
    return 'No interest. No fees.'
  }

  return `Includes ${formatCurrency(plan.serviceFee, 2)} total service fee`
}

export function getRepaymentSchedule(plan: PlanBreakdown, startDate = new Date()): RepaymentStep[] {
  return Array.from({ length: plan.installments }, (_, index) => {
    const stepDate = new Date(startDate)
    stepDate.setMonth(startDate.getMonth() + index)

    const label =
      index === 0
        ? 'Today'
        : stepDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          })

    return {
      label,
      amount: plan.monthlyPayment,
      isToday: index === 0,
    }
  })
}
