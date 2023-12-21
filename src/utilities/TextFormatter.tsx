import moment from 'moment'

export function numberWithCommas(x: number) {
  if (!x) return 0

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const numberWithCommasToFixed = (x: number) => {
  if (!x) return 0

  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const numberWithCommasToFixed1 = (x: number) => {
  if (!x) return 0

  return x
    .toFixed(1)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function formatDate(d: string) {
  return moment(d).format('DD/MM/yyyy, HH:mm')
}

export function formatMoney(amount: number) {
  return amount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export function maximumLetters(l: string, max: number) {
  if (l.length < max) {
    return l
  } else {
    return l.substring(0, max) + '...'
  }
}

export function capitalize(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export function validateOnlyNumber(t: string): string {
  const inputValue = t
  const convertedNumber = inputValue.replace(/^0+|[^\d]/g, '')
  return convertedNumber
}

export function validateOnlyNumWDecimal(t: string): string {
  const inputValue = t
  const convertedNumber = inputValue.replace(/^0+|[^0-9.]/g, '')
  return convertedNumber
}

export function validateNumber(t: string): string {
  const inputValue = t
  const convertedNumber = inputValue.replace(/\D+/g, '')
  return convertedNumber
}
export function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatNumberToK(number: number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k'
  }
  return number.toString()
}
