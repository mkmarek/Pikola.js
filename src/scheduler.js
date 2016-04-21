import resolution from './resolution'
import * as recurrence from './recurrence'
import resolutions from './resolutions/index'

/**
 * Gets default layer props
 */
function getDefaultLayerProps(resolution) {
  return {
    interval: 1,
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
    layers: {
      [resolution.Millisecond]: getDefaultLayerProps(resolution.Millisecond),
      [resolution.Second]: getDefaultLayerProps(resolution.Second),
      [resolution.Minute]: getDefaultLayerProps(resolution.Minute),
      [resolution.Hour]: getDefaultLayerProps(resolution.Hour),
      [resolution.Day]: getDefaultLayerProps(resolution.Day),
      [resolution.Month]: getDefaultLayerProps(resolution.Month)
    }
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
      [layer.recurrence]: {
        ...opt.layers[layer.recurrence],
        ...layer
      }
    }
  }

  return options
}

/**
 * [getExecutionDatesAfter description]
 * @param  {[type]} date [description]
 * @param  {[type]} opt  [description]
 * @param  {[type]} num  [description]
 * @return {[type]}      [description]
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
 * Gets the next possible execution based on the defined schedule and passed date
 *
 * @param  {Date} the date after execution
 * @param  {Object} opt  schedule configuration
 * @return {Date}      Date of the next execution or null when next execution
 *                     is not possible
 */
function getExecutionDateAfter(date, opt, initialRun = false) {

  return resolutions(opt)({ date, initialRun })
}
