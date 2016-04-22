import resolution from '../resolution'

export default {

  MAX: 59,

  resolution: resolution.Second,

  datepart: ({
    date
  }) => date.getSeconds(),

  every: ({
    date,
    interval
  }) => {
    const seconds = date.getSeconds()

    const result = new Date(date)
    result.setSeconds(seconds + interval)

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
