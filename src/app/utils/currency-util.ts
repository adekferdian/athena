export const autoCurency = (n: any) => {
  let num = n
  if (typeof n === 'number') num.toString()
  if (parseInt(num)) {
    const formated = new Intl.NumberFormat('id-ID', {}).format(parseInt(num))
    return `Rp${formated}`
  }
  return `Rp0`
}

export const deCurency = (num: string) => {
  if (!num) return ''
  const amount = parseInt(num.toString().replace(/[^0-9$]/g, ''))
  if (amount) return amount
  return 0
}
