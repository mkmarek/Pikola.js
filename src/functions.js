import {
  addLayer
} from './scheduler'
import resolution from './resolution'
import recurrence from './recurrence'

function func(resolution, type, validate, beforeRun) {
  return (interval) => {
    if (validate) validate(interval)
    return {
      resolution,
      execute: (opt) => {
        if (beforeRun) opt = beforeRun.execute(opt)
        return addLayer({
          resolution,
          type,
          interval
        }, opt)
      }
    }
  }
}

export const OnMillisecond = func(
  resolution.Millisecond,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnMillisecond can\'t be lower than 0')
    if (interval > 999) throw Error('Interval in OnMillisecond can\'t be higher than 999')
  }
)

export const OnSecond = func(
  resolution.Second,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnSecond can\'t be lower than 0')
    if (interval > 59) throw Error('Interval in OnSecond can\'t be higher than 59')
  },
  OnMillisecond(0))

export const OnMinute = func(
  resolution.Minute,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnMinute can\'t be lower than 0')
    if (interval > 59) throw Error('Interval in OnMinute can\'t be higher than 59')
  },
  OnSecond(0))

export const OnHour = func(
  resolution.Hour,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnHour can\'t be lower than 0')
    if (interval > 23) throw Error('Interval in OnHour can\'t be higher than 23')
  },
  OnMinute(0))

export const OnDayOfWeek = func(
  resolution.Day,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnDayOfWeek can\'t be lower than 0')
    if (interval > 6) throw Error('Interval in OnDayOfWeek can\'t be higher than 6')
  },
  OnHour(0))

export const EveryWeek = func(
  resolution.Week,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EveryWeek can\'t be lower than 0')
  },
  OnDayOfWeek(0))

export const OnDayOfMonth = func(
  resolution.Day,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnDayOfMonth can\'t be lower than 0')
    if (interval > 30) throw Error('Interval in OnDayOfMonth can\'t be higher than 30')
  },
  EveryWeek(null))

export const OnWeek = func(
  resolution.Week,
  recurrence.On,
  (interval) => {
    if (interval < 0) throw Error('Interval in OnWeek can\'t be lower than 0')
    if (interval > 4) throw Error('Interval in OnWeek can\'t be higher than 4')
  },
  OnDayOfWeek(0))

export const EveryMillisecond = func(
  resolution.Millisecond,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EveryMillisecond can\'t be lower than 0')
  })

export const EverySecond = func(
  resolution.Second,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EverySecond can\'t be lower than 0')
  },
  OnMillisecond(0))

export const EveryMinute = func(
  resolution.Minute,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EveryMinute can\'t be lower than 0')
  },
  OnSecond(0))

export const EveryHour = func(
  resolution.Hour,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EveryHour can\'t be lower than 0')
  },
  OnMinute(0))

export const EveryDay = func(
  resolution.Day,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EveryDay can\'t be lower than 0')
  },
  OnHour(0))

export const EveryMonth = func(
  resolution.Month,
  recurrence.Every,
  (interval) => {
    if (interval < 0) throw Error('Interval in EveryMonth can\'t be lower than 0')
  },
  OnDayOfMonth(0))
