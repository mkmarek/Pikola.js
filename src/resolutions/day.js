import resolution from '../resolution'

import {
  getIsoWeekFromDate,
  getDateOfISOWeek
} from '../utils'

export default {

  MIN: 0,
  MAX: () => 7,

  resolution: resolution.Day,
  name: 'Day',

  datepart: ({
    date,
    isHigherLayerDisabled
  }) => {
    if (isHigherLayerDisabled) {
      return date.getDate()
    }
    else {
      const weeks = getIsoWeekFromDate(date)
      const weekStart = getDateOfISOWeek(weeks, date.getFullYear())

      return date.getTime() - weekStart.getTime() / 604800000 //total days
    }
  },

  every: ({
    date,
    interval
  }) => {
    const days = date.getDate()

    const result = new Date(date)
    result.setDate(days + (interval || 1))

    return result
  },

  on: ({
    date,
    interval,
    isHigherLayerDisabled
  }) => {

    const result = new Date(date)

    if (isHigherLayerDisabled) {
      result.setDate(interval)
    }
    else {
      const weeks = getIsoWeekFromDate(result)
      const weekStart = getDateOfISOWeek(weeks, result.getFullYear())

      const days = weekStart.getDate()
      weekStart.setDate(days + interval)

      result.setTime(weekStart.getTime())
    }

    return result
  }
}
