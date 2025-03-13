export function useCurrencify(amount) {
  // format:"+ $ 4,999.99"|"- $ 999.00"

  let posNegSymbol = amount > 0 ? '+' : '-'

  const amountPositive = Math.abs(amount)

  const currencySymbol = '$'

  const amountFormatted = amountPositive.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`
}
