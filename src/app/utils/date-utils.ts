import moment from 'moment'

export function formatWithOffset(
  input?: string | moment.Moment,
  offset?: string | number,
  format: string = 'DD/MM/YYYY HH:mm (Z)'
) {
  if (!input) return ''
  let date: moment.Moment
  if (typeof input === 'string') {
    date = moment(input)
    if (offset) date.utcOffset(Number(offset))
  } else {
    date = input
  }
  return date.format(format)
}

//accepted format: YYYY-MM-dd HH:mm
export function getRelativeDate(timeString?: string, offset?: number) {
  const date = moment(timeString)
  if (offset) date.utcOffset(offset)
  const today = moment()
  if (offset) today.utcOffset(offset)
  if (
    date.year() === today.year() &&
    date.month() === today.month() &&
    date.date() === today.date()
  )
    return `Hari ini, ${date.format('HH:mm')}`
  return timeString
}

//accepted format: YYYY-MM-dd HH:mm
export function getMinuteDiffFromNow(timeString?: string) {
  const date = new Date()
  date.setFullYear(Number(timeString?.substr(0, 4) ?? '0'))
  date.setMonth(Number(timeString?.substr(5, 2) ?? '1') - 1)
  date.setDate(Number(timeString?.substr(8, 2) ?? '0'))
  date.setHours(Number(timeString?.substr(11, 2) ?? '0'))
  date.setMinutes(Number(timeString?.substr(14, 2) ?? '0'))
  date.setSeconds(Number(timeString?.substr(17, 2) ?? '0'))
  date.setMilliseconds(0)
  const dateNow = new Date()
  //convert to GMT+7
  dateNow.setTime(dateNow.getTime() - (-420 - dateNow.getTimezoneOffset()) * 60000)
  //add 3 minute and reduce current time
  const relative = date.getTime() + 180000 - dateNow.getTime()

  return `${String(Math.floor(relative / 60000)).padStart(2, '0')}:${String(
    Math.abs(Math.floor((relative % 60000) / 1000))
  ).padStart(2, '0')}`
}
