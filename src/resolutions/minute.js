import resolution from '../resolution'

export default {

  MAX: 59,

  resolution: resolution.Minute,

  datepart: ({
    date
  }) => date.getMinutes(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getMinutes()

    const result = new Date(date)
    result.setMinutes(seconds + interval)

    return result
  },

  on: ({
    date,
    interval
  }) => {
    const result = new Date(date)
    result.setMinutes(interval)

    return result
  }
}
