import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { OtpPage } from './pages/OtpPage'
import { PaymentPage } from './pages/PaymentPage'
import { PlanPage } from './pages/PlanPage'
import { SuccessPage } from './pages/SuccessPage'
import { useCheckoutStore } from './store/checkout-store'

function ThemeEffect() {
  const darkMode = useCheckoutStore((state) => state.darkMode)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeEffect />

      <Routes>
        <Route element={<Navigate replace to="/otp" />} path="/" />
        <Route element={<OtpPage />} path="/otp" />
        <Route element={<PlanPage />} path="/plans" />
        <Route element={<PaymentPage />} path="/payment" />
        <Route element={<SuccessPage />} path="/success" />
        <Route element={<Navigate replace to="/otp" />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}
