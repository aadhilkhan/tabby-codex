import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { PrimaryButton } from '../components/common/PrimaryButton'
import { SkeletonBlock, SkeletonPage } from '../components/common/Skeleton'
import { CheckoutLayout } from '../components/layout/CheckoutLayout'
import { AmountSummary } from '../components/payment/AmountSummary'
import { PaymentMethodModal } from '../components/payment/PaymentMethodModal'
import { PaymentMethodSection } from '../components/payment/PaymentMethodSection'
import { PlanSummaryRow } from '../components/plans/PlanSummaryRow'
import { RepaymentScheduleModal } from '../components/plans/RepaymentScheduleModal'
import { formatCurrency } from '../lib/currency'
import { getPlanBreakdown } from '../lib/plans'
import { useCheckoutStore } from '../store/checkout-store'

export function PaymentPage() {
  const otpVerified = useCheckoutStore((state) => state.otpVerified)
  const orderAmount = useCheckoutStore((state) => state.orderAmount)
  const selectedPlanInstallments = useCheckoutStore((state) => state.selectedPlanInstallments)
  const selectedPaymentMethod = useCheckoutStore((state) => state.selectedPaymentMethod)
  const cashbackApplied = useCheckoutStore((state) => state.cashbackApplied)
  const cashbackBalance = useCheckoutStore((state) => state.cashbackBalance)
  const setCashbackApplied = useCheckoutStore((state) => state.setCashbackApplied)
  const setSelectedPaymentMethod = useCheckoutStore((state) => state.setSelectedPaymentMethod)
  const completePayment = useCheckoutStore((state) => state.completePayment)

  const [isLoading, setIsLoading] = useState(true)
  const [isMethodModalOpen, setMethodModalOpen] = useState(false)
  const [isScheduleOpen, setScheduleOpen] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const plan = useMemo(
    () => getPlanBreakdown(orderAmount, selectedPlanInstallments),
    [orderAmount, selectedPlanInstallments],
  )

  if (!otpVerified) {
    return <Navigate replace to="/otp" />
  }

  const dueToday = Math.max(plan.dueToday - (cashbackApplied ? cashbackBalance : 0), 0)

  const onPay = async () => {
    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 1200))
    completePayment()
    navigate('/success')
  }

  return (
    <CheckoutLayout>
      {isLoading ? (
        <SkeletonPage>
          <div className="px-8">
            <SkeletonBlock className="h-8 w-44" />
          </div>
          <div className="px-8 pt-5">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="mt-2 h-16 w-full" />
            <SkeletonBlock className="mt-2 h-16 w-full" />
          </div>
          <div className="px-8 pt-4">
            <SkeletonBlock className="h-px w-full" />
            <SkeletonBlock className="mt-4 h-40 w-full" />
          </div>
        </SkeletonPage>
      ) : (
        <>
          <div className="px-8 pb-2">
            <h1 className="text-[52px] font-semibold leading-[24px] tracking-[-0.22px] text-[var(--text-primary)]">Review and pay</h1>
          </div>

          <PaymentMethodSection
            cashbackApplied={cashbackApplied}
            cashbackBalance={cashbackBalance}
            onOpenMethodModal={() => setMethodModalOpen(true)}
            onToggleCashback={() => setCashbackApplied(!cashbackApplied)}
            selectedMethod={selectedPaymentMethod}
          />

          <div className="mt-2 px-4">
            <div className="h-px bg-[var(--line-muted)]" />
          </div>

          <section className="pt-3">
            <div className="px-8">
              <h2 className="text-[16px] font-bold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Your plan</h2>
            </div>
            <PlanSummaryRow plan={plan} onOpenSchedule={() => setScheduleOpen(true)} showBadge={selectedPlanInstallments === 4 ? 'Pay in 4' : undefined} />
            <AmountSummary dueToday={dueToday} orderAmount={orderAmount} />
          </section>

          <div className="mt-2 px-4">
            <div className="h-px bg-[var(--line-muted)]" />
          </div>

          <section className="px-8 pt-3">
            <p className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-[var(--text-secondary)]">
              We’ll send you a reminder before your next payment is due.
            </p>
            <p className="pt-2 text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-[var(--text-secondary)]">
              By paying for this order, you acknowledge the <a className="text-[#5d21de]" href="#">Key Fact Statement</a> and agree
              to the <a className="text-[#5d21de]" href="#">terms and conditions</a>
            </p>
          </section>

          <div className="px-6 pt-6">
            <PrimaryButton loading={isSubmitting} onClick={onPay} type="button">
              Pay {formatCurrency(dueToday, 0)}
            </PrimaryButton>
          </div>

          <PaymentMethodModal
            onClose={() => setMethodModalOpen(false)}
            onSelectMethod={setSelectedPaymentMethod}
            open={isMethodModalOpen}
            selectedMethod={selectedPaymentMethod}
          />
          <RepaymentScheduleModal onClose={() => setScheduleOpen(false)} open={isScheduleOpen} plan={plan} />
        </>
      )}
    </CheckoutLayout>
  )
}
