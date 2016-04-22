import resolution from '../resolution'

export default {

  MAX: 23,

  resolution: resolution.Hour,

  datepart: ({
    date
  }) => date.getHours(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getHours()

    const result = new Date(date)
    result.setHours(seconds + interval)

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
