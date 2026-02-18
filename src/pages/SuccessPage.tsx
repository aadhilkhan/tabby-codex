import { Navigate } from 'react-router-dom'

import successCheck from '../assets/illustrations/success-check.svg'
import successShadow from '../assets/illustrations/success-shadow.svg'
import { CheckoutLayout } from '../components/layout/CheckoutLayout'
import { useCheckoutStore } from '../store/checkout-store'

export function SuccessPage() {
  const paymentCompleted = useCheckoutStore((state) => state.paymentCompleted)

  if (!paymentCompleted) {
    return <Navigate replace to="/payment" />
  }

  return (
    <CheckoutLayout cardClassName="pt-4">
      <section className="flex flex-col items-center pb-16 pt-2">
        <div className="relative h-[180px] w-[180px] animate-success-bob">
          <img alt="Shadow" className="absolute bottom-[38px] left-[42px] w-24" src={successShadow} />
          <img alt="Success" className="absolute left-[37px] top-[44px] w-[106px]" src={successCheck} />
        </div>

        <h1 className="mt-1 text-center text-[30px] font-semibold leading-[32px] tracking-[-0.3px] text-[var(--text-primary)]">Mission complete!</h1>
        <p className="mt-2 text-center text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-secondary)]">
          We’re taking you back to Adidas now
        </p>
      </section>

      <section className="flex items-center justify-center gap-2 pb-6">
        <span className="inline-block h-4 w-4 rounded-full border-2 border-[#B3C0CF] border-t-transparent animate-spin" />
        <p className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-[#8698AD]">Please don’t close this screen</p>
      </section>
    </CheckoutLayout>
  )
}
