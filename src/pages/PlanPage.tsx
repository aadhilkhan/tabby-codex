import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { PrimaryButton } from '../components/common/PrimaryButton'
import { SkeletonBlock, SkeletonPage } from '../components/common/Skeleton'
import { CheckoutLayout } from '../components/layout/CheckoutLayout'
import { PlanPillGroup } from '../components/plans/PlanPillGroup'
import { PlanSummaryRow } from '../components/plans/PlanSummaryRow'
import { RepaymentScheduleModal } from '../components/plans/RepaymentScheduleModal'
import { formatCurrency } from '../lib/currency'
import { getPlanBreakdown, PLAN_ORDER } from '../lib/plans'
import { useCheckoutStore } from '../store/checkout-store'

export function PlanPage() {
  const otpVerified = useCheckoutStore((state) => state.otpVerified)
  const orderAmount = useCheckoutStore((state) => state.orderAmount)
  const selectedPlanInstallments = useCheckoutStore((state) => state.selectedPlanInstallments)
  const setSelectedPlanInstallments = useCheckoutStore((state) => state.setSelectedPlanInstallments)

  const [isLoading, setIsLoading] = useState(true)
  const [isScheduleOpen, setScheduleOpen] = useState(false)
  const [isContinuing, setContinuing] = useState(false)

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

  const goToPayment = async () => {
    setContinuing(true)
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    navigate('/payment')
  }

  return (
    <CheckoutLayout>
      {isLoading ? (
        <SkeletonPage>
          <div className="px-8">
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="mt-3 h-10 w-56" />
          </div>
          <div className="px-8 pt-7">
            <SkeletonBlock className="h-5 w-32" />
            <div className="mt-3 flex gap-2">
              <SkeletonBlock className="h-10 w-16 rounded-full" />
              <SkeletonBlock className="h-10 w-16 rounded-full" />
              <SkeletonBlock className="h-10 w-16 rounded-full" />
              <SkeletonBlock className="h-10 w-16 rounded-full" />
            </div>
          </div>
          <div className="px-8 pt-4">
            <SkeletonBlock className="h-px w-full" />
            <SkeletonBlock className="mt-4 h-16 w-full" />
          </div>
        </SkeletonPage>
      ) : (
        <>
          <div className="px-8">
            <p className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-secondary)]">Choose how to pay</p>
            <h1 className="pt-1 text-[52px] font-semibold leading-[36px] tracking-[-0.7px] text-[var(--text-primary)]">{formatCurrency(orderAmount)}</h1>
          </div>

          <div className="pt-8">
            <p className="px-8 pb-3 text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-secondary)]">Number of payments</p>
            <PlanPillGroup
              onSelect={setSelectedPlanInstallments}
              plans={PLAN_ORDER}
              selected={selectedPlanInstallments}
            />
          </div>

          <div className="mt-1 px-4">
            <div className="h-px bg-[var(--line-muted)]" />
          </div>

          <div className="mt-2">
            <PlanSummaryRow plan={plan} onOpenSchedule={() => setScheduleOpen(true)} showBadge={plan.installments === 4 ? 'Pay in 4' : undefined} />
          </div>

          <div className="px-6 pt-6">
            <PrimaryButton loading={isContinuing} onClick={goToPayment} type="button">
              Continue
            </PrimaryButton>
          </div>

          <RepaymentScheduleModal onClose={() => setScheduleOpen(false)} open={isScheduleOpen} plan={plan} />
        </>
      )}
    </CheckoutLayout>
  )
}
