import {
  addLayer
} from './scheduler'
import resolution from './resolution'
import recurrence from './recurrence'

function func(resolution, type, beforeRun) {
  return (interval) => ({
    resolution,
    execute: (opt) => {
      if (beforeRun) opt = beforeRun.execute(opt)
      return addLayer({
        resolution,
        type,
        interval
      }, opt)
    }
  })
}

export const OnMillisecond = func(
  resolution.Millisecond,
  recurrence.On
)

export const OnSecond = func(
  resolution.Second,
  recurrence.On,
  OnMillisecond(0))

export const OnMinute = func(
  resolution.Minute,
  recurrence.On,
  OnSecond(0))

export const OnHour = func(
  resolution.Hour,
  recurrence.On,
  OnMinute(0))

export const OnDayOfWeek = func(
  resolution.Day,
  recurrence.On,
  OnHour(0))

export const EveryWeek = func(
  resolution.Week,
  recurrence.Every,
  OnDayOfWeek(0))

export const OnDayOfMonth = func(
  resolution.Day,
  recurrence.On,
  EveryWeek(null))

export const OnWeek = func(
  resolution.Week,
  recurrence.On,
  OnDayOfWeek(0))

export const EveryMillisecond = func(
  resolution.Millisecond,
  recurrence.Every)

export const EverySecond = func(
  resolution.Second,
  recurrence.Every,
  OnMillisecond(0))

export const EveryMinute = func(
  resolution.Minute,
  recurrence.Every,
  OnSecond(0))

export const EveryHour = func(
  resolution.Hour,
  recurrence.Every,
  OnMinute(0))

export const EveryDay = func(
  resolution.Day,
  recurrence.Every,
  OnHour(0))

export const EveryMonth = func(
  resolution.Month,
  recurrence.Every,
  OnDayOfMonth(1))
