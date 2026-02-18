import { useRef } from 'react'

type OtpCodeFieldProps = {
  value: string
  hasError?: boolean
  onChange: (value: string) => void
}

const OTP_LENGTH = 4

export function OtpCodeField({ value, hasError = false, onChange }: OtpCodeFieldProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const characters = value.padEnd(OTP_LENGTH).slice(0, OTP_LENGTH).split('')

  const updateCharacter = (index: number, nextChar: string) => {
    const next = [...characters]
    next[index] = nextChar
    onChange(next.join('').trimEnd())
  }

  const onInput = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1)
    updateCharacter(index, digit)

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !characters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      return
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      event.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)

    if (!pasted) {
      return
    }

    onChange(pasted)
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus()
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="One-time password input">
      {characters.map((character, index) => (
        <input
          key={index}
          ref={(input) => {
            inputRefs.current[index] = input
          }}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          className={[
            'h-14 w-12 rounded-[16px] border bg-transparent text-center text-[24px] font-semibold leading-[26px] tracking-[-0.24px] text-[var(--text-primary)] outline-none transition',
            hasError ? 'border-[#E45A5A]' : 'border-[var(--line-primary)] focus:border-[var(--text-primary)] focus:border-[1.5px]',
          ].join(' ')}
          inputMode="numeric"
          maxLength={1}
          onChange={(event) => onInput(index, event.target.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          type="text"
          value={character.trim()}
        />
      ))}
    </div>
  )
}
