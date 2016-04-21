import resolution from '../resolution'

export default {

  MIN: 0,
  MAX: 59,

  resolution: resolution.Second,
  name: 'Second',

  datepart: ({
    date
  }) => date.getSeconds(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getSeconds()

    const result = new Date(date)
    result.setSeconds(seconds + (interval || 1))

    return result
  },

  on: ({
    date,
    interval
  }) => {
    const result = new Date(date)
    result.setSeconds(interval)

    return result
  }
}
