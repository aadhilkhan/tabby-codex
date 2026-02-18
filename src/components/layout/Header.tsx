import adidasMerchant from '../../assets/brand/adidas-merchant.png'
import tabbyWordmark from '../../assets/brand/tabby-wordmark.svg'
import { useCheckoutStore } from '../../store/checkout-store'

type HeaderProps = {
  onCloseRequest: () => void
}

export function Header({ onCloseRequest }: HeaderProps) {
  const language = useCheckoutStore((state) => state.language)
  const darkMode = useCheckoutStore((state) => state.darkMode)
  const toggleLanguage = useCheckoutStore((state) => state.toggleLanguage)
  const toggleDarkMode = useCheckoutStore((state) => state.toggleDarkMode)

  const languageLabel = language === 'en' ? 'العربية' : 'English'

  return (
    <header className="h-[72px] bg-[var(--header-bg)] px-5 sm:px-6">
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between">
        <div className="flex items-center gap-[13px]">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img alt="Adidas" className="h-full w-full object-cover" src={adidasMerchant} />
          </div>

          <div className="leading-none">
            <p className="text-[16px] font-bold leading-[20px] tracking-[-0.16px] text-[var(--text-primary)]">Adidas</p>
            <div className="mt-[2px] flex items-center gap-1">
              <span className="text-[12px] font-medium leading-[16px] tracking-[-0.13px] text-[var(--text-secondary)]">Pay with</span>
              <img alt="Tabby" className="h-[13px] w-auto" src={tabbyWordmark} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            className="text-[14px] font-medium leading-[18px] tracking-[-0.16px] text-[var(--text-primary)] transition hover:opacity-70"
            onClick={toggleLanguage}
            type="button"
          >
            {languageLabel}
          </button>

          <button
            aria-label="Toggle dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            onClick={toggleDarkMode}
            type="button"
          >
            {darkMode ? (
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4V2M12 22V20M4 12H2M22 12H20M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" fill="currentColor" r="4.5" />
              </svg>
            ) : (
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.354 14.354C19.4 14.77 18.35 15 17.246 15C12.96 15 9.5 11.54 9.5 7.254C9.5 6.15 9.73 5.1 10.146 4.146C6.576 4.93 4 8.106 4 12C4 16.418 7.582 20 12 20C15.894 20 19.07 17.424 19.854 13.854C19.694 14.025 20.354 14.354 20.354 14.354Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <button
            aria-label="Close checkout"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
            onClick={onCloseRequest}
            type="button"
          >
            <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
