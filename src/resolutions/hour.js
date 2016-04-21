import resolution from '../resolution'

export default {

  MIN: 0,
  MAX: 23,

  resolution: resolution.Hour,
  name: 'Hour',

  datepart: ({
    date
  }) => date.getHours(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getHours()

    const result = new Date(date)
    result.setHours(seconds + (interval || 1))

    return result
  },

  on: ({
    date,
    interval
  }) => {
    const result = new Date(date)
    result.setHours(interval)

    return result
  }
}
