import { create } from 'zustand'

import type { InstallmentCount, PaymentMethodId } from '../types/checkout'

type LanguageCode = 'en' | 'ar'

type CheckoutStore = {
  orderAmount: number
  phoneNumber: string
  otpVerified: boolean
  otpError: string | null
  selectedPlanInstallments: InstallmentCount
  selectedPaymentMethod: PaymentMethodId
  cashbackBalance: number
  cashbackApplied: boolean
  paymentCompleted: boolean
  darkMode: boolean
  language: LanguageCode
  verifyOtp: (otpCode: string) => boolean
  clearOtpError: () => void
  setSelectedPlanInstallments: (installments: InstallmentCount) => void
  setSelectedPaymentMethod: (method: PaymentMethodId) => void
  setCashbackApplied: (enabled: boolean) => void
  completePayment: () => void
  toggleDarkMode: () => void
  toggleLanguage: () => void
  resetFlow: () => void
}

const initialState = {
  orderAmount: 1600,
  phoneNumber: '+971 58 5858 290',
  otpVerified: false,
  otpError: null,
  selectedPlanInstallments: 4 as InstallmentCount,
  selectedPaymentMethod: 'debit-card' as PaymentMethodId,
  cashbackBalance: 50,
  cashbackApplied: false,
  paymentCompleted: false,
  darkMode: false,
  language: 'en' as LanguageCode,
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,
  verifyOtp: (otpCode: string) => {
    const isValid = otpCode === '8888'

    if (isValid) {
      set({ otpVerified: true, otpError: null })
      return true
    }

    set({ otpVerified: false, otpError: 'Incorrect code. Try 8888 for this prototype.' })
    return false
  },
  clearOtpError: () => {
    set({ otpError: null })
  },
  setSelectedPlanInstallments: (installments) => {
    set({ selectedPlanInstallments: installments })
  },
  setSelectedPaymentMethod: (method) => {
    set({ selectedPaymentMethod: method })
  },
  setCashbackApplied: (enabled) => {
    set({ cashbackApplied: enabled })
  },
  completePayment: () => {
    set({ paymentCompleted: true })
  },
  toggleDarkMode: () => {
    set((state) => ({ darkMode: !state.darkMode }))
  },
  toggleLanguage: () => {
    set((state) => ({ language: state.language === 'en' ? 'ar' : 'en' }))
  },
  resetFlow: () => {
    set({
      ...initialState,
      darkMode: useCheckoutStore.getState().darkMode,
      language: useCheckoutStore.getState().language,
    })
  },
}))
