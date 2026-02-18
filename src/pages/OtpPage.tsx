import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { PrimaryButton } from '../components/common/PrimaryButton'
import { CheckoutLayout } from '../components/layout/CheckoutLayout'
import { OtpCodeField } from '../components/otp/OtpCodeField'
import { useCheckoutStore } from '../store/checkout-store'

const RESEND_TIMER_START = 59

export function OtpPage() {
  const otpVerified = useCheckoutStore((state) => state.otpVerified)
  const otpError = useCheckoutStore((state) => state.otpError)
  const phoneNumber = useCheckoutStore((state) => state.phoneNumber)
  const verifyOtp = useCheckoutStore((state) => state.verifyOtp)
  const clearOtpError = useCheckoutStore((state) => state.clearOtpError)

  const [otpCode, setOtpCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_TIMER_START)

  const navigate = useNavigate()

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setSecondsRemaining((current) => current - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [secondsRemaining])

  const resendText = useMemo(() => {
    const mins = Math.floor(secondsRemaining / 60)
    const secs = secondsRemaining % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [secondsRemaining])

  if (otpVerified) {
    return <Navigate replace to="/plans" />
  }

  const continueToPlans = async () => {
    setIsSubmitting(true)

    await new Promise((resolve) => window.setTimeout(resolve, 850))

    const valid = verifyOtp(otpCode)
    setIsSubmitting(false)

    if (valid) {
      navigate('/plans')
    }
  }

  return (
    <CheckoutLayout>
      <div className="px-8">
        <h1 className="text-[52px] font-semibold leading-[80px] tracking-[-0.8px] text-[var(--text-primary)]">Enter 4-digit code</h1>
        <p className="mt-1 text-[32px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Sent via push notification or SMS</p>
      </div>

      <div className="mt-6 px-8">
        <div className="inline-flex items-center gap-2 rounded-[28px] bg-[var(--surface-muted)] px-3 py-2.5">
          <span className="inline-flex h-5 w-5 items-center justify-center text-[var(--text-secondary)]">
            <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
              <rect height="16" rx="3" stroke="currentColor" strokeWidth="1.6" width="11" x="6.5" y="4" />
              <circle cx="12" cy="16.5" fill="currentColor" r="1" />
            </svg>
          </span>

          <span className="text-[16px] font-medium leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">{phoneNumber}</span>
          <span className="h-5 w-px bg-[var(--line-primary)]" />
          <button className="text-[16px] font-bold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]" type="button">
            Switch Account
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3 px-8">
        <OtpCodeField
          hasError={Boolean(otpError)}
          onChange={(value) => {
            setOtpCode(value)
            if (otpError) {
              clearOtpError()
            }
          }}
          value={otpCode}
        />

        <p className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-tertiary)]">Send another code {resendText}</p>
        {otpError ? <p className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[#E45A5A]">{otpError}</p> : null}
      </div>

      <div className="mt-5 px-8">
        <p className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-[var(--text-secondary)]">
          By continuing, you accept Tabby’s <a className="text-[#5d21de]" href="#">terms & conditions</a>,{' '}
          <a className="text-[#5d21de]" href="#">privacy policy</a> and consent to{' '}
          <a className="text-[#5d21de]" href="#">sharing my data</a> with AECB
        </p>
      </div>

      <div className="px-6 pt-6">
        <PrimaryButton loading={isSubmitting} onClick={continueToPlans} type="button" disabled={otpCode.length !== 4}>
          Continue
        </PrimaryButton>
      </div>
    </CheckoutLayout>
  )
}
