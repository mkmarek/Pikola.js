import resolution from './resolution'
import recurrence from './recurrence'
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
 * Gets the next possible execution based on the defined schedule and passed date
 *
 * @param  {Date}         the date from which the first exection shall start
 * @param  {Object} opt   schedule configuration
 * @return {Date}         Date of the next execution or null when next execution
 *                        is not possible
 */
function getExecutionDateAfter(date, opt, initialRun) {
  return resolutions(opt)({ date, initialRun })
}
