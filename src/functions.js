import { addLayer } from './scheduler'
import resolution from './resolution'
import recurrence from './recurrence'

export function EveryMillisecond(interval, opt) {

  const newOpt = addLayer({
    recurrence: resolution.Millisecond,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function EverySecond(interval, opt) {

  opt = OnMillisecond(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Second,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function EveryMinute(interval, opt) {

  opt = OnSecond(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Minute,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function EveryHour(interval, opt) {

  opt = OnMinute(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Hour,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function EveryDay(interval, opt) {

  opt = OnHour(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Day,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function EveryWeek(interval, opt) {

  opt = OnDayOfWeek(0, opt) //1 based

  const newOpt = addLayer({
    recurrence: resolution.Week,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function EveryMonth(interval, opt) {
  opt = OnDayOfMonth(1, opt) //1 based

  const newOpt = addLayer({
    recurrence: resolution.Month,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

export function OnMillisecond(interval, opt) {

  const newOpt = addLayer({
    recurrence: resolution.Millisecond,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

export function OnSecond(interval, opt) {

  opt = OnMillisecond(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Second,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

export function OnMinute(interval, opt) {

  opt = OnSecond(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Minute,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

export function OnHour(interval, opt) {

  opt = OnMinute(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Hour,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

export function OnDayOfMonth(interval, opt) {

  opt = EveryWeek(null, opt) //disable week layer

  const newOpt = addLayer({
    recurrence: resolution.Day,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

export function OnDayOfWeek(interval, opt) {

  opt = OnHour(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Day,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

export function OnWeek(interval, opt) {

  opt = OnDayOfWeek(0, opt)

  const newOpt = addLayer({
    recurrence: resolution.Week,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}
