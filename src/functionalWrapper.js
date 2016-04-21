import resolution from './resolution'
import * as recurrence from './recurrence'
import * as scheduler from './scheduler'

function EveryMillisecond(interval, opt) {

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Millisecond,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

function EverySecond(interval, opt) {

  opt = OnMillisecond(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Second,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

function EveryMinute(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Minute,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

function EveryHour(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)
  opt = OnMinute(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Hour,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

function EveryDay(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)
  opt = OnMinute(0, opt)
  opt = OnHour(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Day,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

function EveryMonth(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)
  opt = OnMinute(0, opt)
  opt = OnHour(0, opt)
  opt = OnDay(1, opt) //1 based

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Month,
    type : recurrence.Every,
    interval: interval
  }, opt)

  return newOpt
}

function OnMillisecond(interval, opt) {

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Millisecond,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

function OnSecond(interval, opt) {

  opt = OnMillisecond(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Second,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

function OnMinute(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Minute,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

function OnHour(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)
  opt = OnMinute(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Hour,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

function OnDay(interval, opt) {

  opt = OnMillisecond(0, opt)
  opt = OnSecond(0, opt)
  opt = OnMinute(0, opt)
  opt = OnHour(0, opt)

  const newOpt = scheduler.addLayer({
    recurrence: resolution.Day,
    type : recurrence.On,
    interval: interval
  }, opt)

  return newOpt
}

function GetExecutionDatesAfter(date, opt, numberOfDates) {
  return scheduler.getExecutionDatesAfter(date, opt, numberOfDates)
}

const wrap = (opt) => ({
  EveryMillisecond : (interval) => wrap(EveryMillisecond(interval, opt)),
  EverySecond : (interval) => wrap(EverySecond(interval, opt)),
  EveryMinute : (interval) => wrap(EveryMinute(interval, opt)),
  EveryHour : (interval) => wrap(EveryHour(interval, opt)),
  EveryDay : (interval) => wrap(EveryDay(interval, opt)),
  EveryMonth : (interval) => wrap(EveryMonth(interval, opt)),

  OnMillisecond : (interval) => wrap(OnMillisecond(interval, opt)),
  OnSecond : (interval) => wrap(OnSecond(interval, opt)),
  OnMinute : (interval) => wrap(OnMinute(interval, opt)),
  OnHour : (interval) => wrap(OnHour(interval, opt)),
  OnDay : (interval) => wrap(OnDay(interval, opt)),

  GetExecutionDatesAfter : (date, numberOfDates) =>
    GetExecutionDatesAfter(date, opt, numberOfDates)
})

export default function create() {
  const opt = scheduler.create()

  return wrap(opt)
}
