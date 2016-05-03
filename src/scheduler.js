import resolution from './resolution'
import recurrence from './recurrence'
import resolutions from './resolutions/index'

const TIMER_RESOLUTION = 100

/**
 * Gets default layer props
 */
function getDefaultLayerProps(resolution) {
  return {
    interval: [ 1 ],
    type: recurrence.Every,
    resolution
  }
}

/**
 * Creates an empty configuration object with default settings
 * @return {Object} Configuration object holding all the scheduling info
 */
export function create() {
  const options = {
    layers: Object.keys(resolution)
      .reduce((composed, res) => ({
        ...composed,
        [resolution[res]]: getDefaultLayerProps(resolution[res])
      }), {})
  }

  return options
}

/**
 * Adds a recurrence layer to the config object
 * @param {Object} layer Object desribing one recurence layer
 * @param {Object} opt   Input configuration object that shall be modified
 * @return {Object} Configuration object holding new scheduling info
 */
export function addLayer(layer, opt) {

  const options = {
    ...opt,
    layers: {
      ...opt.layers,
      [layer.resolution]: {
        ...opt.layers[layer.resolution],
        ...layer
      }
    }
  }

  return options
}

/**
 * Gets a number of dates which are based on defined options
 * @param  {Date}        the date from which the first exection shall start
 * @param  {Object} opt  schedule configuration
 * @param  {Number} num  maximum number of dates which should be returned
 * @return {Array}       array of dates describing future invocations
 */
export function getExecutionDatesAfter(date, opt, num) {

  let i = 0
  let dates = []
  let start = date

  while (dates.length < num && date) {
    date = getExecutionDateAfter(date, opt, !i)
    if (date != null && date >= start) {
      dates.push(date)
    }
    i++
  }

  return dates
}

/**
 * Registers fire callback
 *
 * @param  {Function} cb  Callback that should be fired after schedule is up
 * @param  {Object}   opt schedule configuration
 */
export function onFire(cb, opt) {
  opt = {
    ...opt,
    callbacks: {
      ...opt.callbacks,
      fire: cb
    }
  }

  return opt
}

/**
 * Plans next execution of provided trigger
 * @param  {Object} options   Trigger options
 * @param  {Date}   start     Start of the trigger
 * @param  {Date}   date      Date of previous execution
 */
function planNextExecution(options, start, date = null) {
  const nextRun = getExecutionDateAfter(date || start, options, date == null)
  const delay = nextRun - new Date()

  if (delay - options.executionDelay > 0) {
    doTimer(delay - options.executionDelay, TIMER_RESOLUTION, () => {
      options.executionDelay = (options.executionDelay + (new Date() - nextRun)) / 2
      if (options.fire(nextRun) !== false)
        planNextExecution(options, start, nextRun)
    })
  } else {
    if (options.fire(nextRun) !== false)
      setTimeout(() => planNextExecution(options, start, nextRun), 0)
  }
}

/**
 * Sets up timer to fire in defined interval
 */
function doTimer(length, resolution, oncomplete) {
  const steps = (length / 100) * (resolution / 10),
    speed = length / steps,
    start = new Date().getTime()

  let count = 0

  function instance() {
    if (count++ >= steps) {
      oncomplete(steps, count)
    } else {
      const diff = (new Date().getTime() - start) - (count * speed)
      setTimeout(instance, (speed - diff))
    }
  }

  setTimeout(instance, speed)
}

/**
 * Starts timer execution
 * @param  {Date}   when      When this timer shall start
 * @param  {Object} options   Trigger options
 */
export function start(when, options) {
  const delay = when - new Date()

  options.executionDelay = 0

  if (delay > 0) {
    doTimer(delay, TIMER_RESOLUTION, () => planNextExecution(options, when))
  } else {
    planNextExecution(options, when)
  }
}

/**
 * Gets the next possible execution based on the defined schedule and passed date
 *
 * @param  {Date}         the date from which the first exection shall start
 * @param  {Object} opt   schedule configuration
 * @return {Date}         Date of the next execution or null when next execution
 *                        is not possible
 */
function getExecutionDateAfter(date, opt, initialRun) {
  return resolutions(opt)({
    date,
    initialRun
  })
}
