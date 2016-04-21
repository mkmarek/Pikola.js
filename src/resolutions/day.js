import resolution from '../resolution'

export default {

  MIN: 0,
  MAX: ({
    date
  }) => new Date(date.getYear(), date.getMonth() + 1, 0).getDate(),

  resolution: resolution.Day,
  name: 'Day',

  datepart: ({
    date
  }) => date.getDate(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getDate()

    const result = new Date(date)
    result.setDate(seconds + (interval || 1))

    return result
  },

  on: ({
    date,
    interval
  }) => {
    const result = new Date(date)
    result.setDate(interval)

    return result
  }
}
