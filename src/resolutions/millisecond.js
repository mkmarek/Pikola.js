import resolution from '../resolution'

export default {

  MIN: 0,
  MAX: 999,

  resolution: resolution.Millisecond,
  name: 'Millisecond',

  datepart: ({
    date
  }) => date.getMilliseconds(),

  every: ({
    date,
    interval
  }) => {
    const milliseconds = date.getMilliseconds()

    const result = new Date(date)
    result.setMilliseconds(milliseconds + (interval || 1))

    return result
  },

  on: ({
    date,
    interval
  }) => {
    const result = new Date(date)
    result.setMilliseconds(interval)

    return result
  }
}
