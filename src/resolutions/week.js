import resolution from '../resolution'
import {
  getFirstDayOfWeekInMonth,
  getTotalWeeksInMonth,
  getIsoWeekFromDate,
  getDateOfISOWeek,
  weeksInMonth
} from '../utils'

export default {

  MAX: ({
      date,
      isHigherResNonDefault
    }) => isHigherResNonDefault ?
    getTotalWeeksInMonth(date) : getIsoWeekFromDate(new Date(date.getYear() + 1, 0, 0)),

  resolution: resolution.Week,

  datepart: ({
    date,
    isHigherResNonDefault
  }) => isHigherResNonDefault ? weeksInMonth(date) : getIsoWeekFromDate(date),

  every: ({
    date,
    interval
  }) => {
    const weeks = getIsoWeekFromDate(date)
    const result = getDateOfISOWeek(weeks + (interval || 1), date.getFullYear())

    return result
  },

  on: ({
    date,
    interval
  }) => getFirstDayOfWeekInMonth(date, interval)
}
