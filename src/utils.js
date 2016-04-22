/**
 * Gets a first day in the month specified in provided date and in the
 * week number
 * @param  {Date} date    Date for which is should count weeks
 * @param  {Number} week  Week number
 * @return {Date}         Date specifying the first day of a specific week
 */
export function getFirstDayOfWeekInMonth(date, week) {
  if (week >= getTotalWeeksInMonth(date))
    return null

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)

  if (week == 0)
    return firstDayOfMonth

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    (7 * week) - firstDayOfMonth.getDay() + 2
  )
}

//Source: http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
export function getDateOfISOWeek(w, y) {
  const simple = new Date(y, 0, 1 + (w - 1) * 7)

  const dow = simple.getDay()
  const ISOweekStart = simple

  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())

  return ISOweekStart
}

export function getIsoWeekFromDate(date) {
  const target = new Date(date.valueOf())
  const dayNr = (date.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)

  const firstThursday = target.valueOf()

  target.setMonth(0, 1)

  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7)
  }

  return 1 + Math.ceil((firstThursday - target) / 604800000)
}

export function getTotalWeeksInMonth(date) {
  const month = date.getMonth(),
    year = date.getFullYear(),
    firstWeekday = new Date(year, month, 1).getDay(),
    lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
    index = 1 // start index at 0 or 1, your choice
    ,
    weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)

  return weeksInMonth
}
export function weeksInMonth(date) {
  const totalWeeks = getTotalWeeksInMonth(date)

  for (let i = 0; i < totalWeeks; i++) {
    if (getFirstDayOfWeekInMonth(date, i) > date)
      return i-1
  }
}
