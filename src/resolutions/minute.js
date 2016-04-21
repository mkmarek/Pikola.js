import resolution from '../resolution'

export default {

  MIN: 0,
  MAX: 59,

  resolution: resolution.Minute,
  name: 'Minute',

  datepart: ({
    date
  }) => date.getMinutes(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getMinutes()

    const result = new Date(date)
    result.setMinutes(seconds + (interval || 1))

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
