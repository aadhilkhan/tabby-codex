const wholeNumberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const decimalFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function roundMoney(value: number) {
  return Math.round(value * 100) / 100
}

export function formatCurrency(value: number, decimals = 0) {
  const formatter = decimals === 0 ? wholeNumberFormatter : decimalFormatter
  return `Ð ${formatter.format(value)}`
}
