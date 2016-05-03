import resolution from '../resolution'
import recurrence from '../recurrence'

import {
  getIsoWeekFromDate,
  getDateOfISOWeek
} from '../utils'

export default {

  MAX: ({
    date,
    layers
  }) => {
    if (layers[resolution.Week].type == recurrence.Every && layers[resolution.Week].interval > 1) {
      return 7 //7 days in a week
    }
    else if (layers[resolution.Month].type == recurrence.Every && layers[resolution.Month].interval > 1) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() //get total days of specified month
    }
  },

  resolution: resolution.Day,

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

      return (date - weekStart) / 86400000  //total days
    }
  },

  every: ({
    date,
    interval
  }) => {
    const days = date.getDate()

    const result = new Date(date)
    result.setDate(days + interval)

    return result
  },

  on: ({
    date,
    interval,
    isHigherLayerDisabled
  }) => {

    const result = new Date(date)

    if (isHigherLayerDisabled) {
      result.setDate(interval + 1)
    }
    else {
      const weeks = getIsoWeekFromDate(result)
      const weekStart = getDateOfISOWeek(weeks, result.getFullYear())

      const days = weekStart.getDate()
      weekStart.setDate(days + interval)

      //prevent going to previous Month
      if (result.getMonth() > weekStart.getMonth())
        result.setDate(1)
      else
        result.setTime(weekStart.getTime())
    }

    return result
  }
}
