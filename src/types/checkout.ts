export type InstallmentCount = 4 | 6 | 8 | 10 | 12

export type PaymentMethodId = 'apple-pay' | 'debit-card'

export type PlanOption = {
  installments: InstallmentCount
  serviceFee: number
  badge?: string
}

export type PlanBreakdown = {
  installments: InstallmentCount
  serviceFee: number
  monthlyPayment: number
  totalPayable: number
  dueToday: number
}

export type RepaymentStep = {
  label: string
  amount: number
  isToday: boolean
}
