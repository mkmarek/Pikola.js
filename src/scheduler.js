import * as layers from './recurrenceLayerTypes'
import * as types from './recurrenceTypes'
import layerImpl from './recurrenceLayerImpl'

/**
 * Gets default layer props
 */
function getDefaultLayerProps() {
  return {
    interval: 1,
    type: types.Every
  }
}

/**
 * Creates an empty configuration object with default settings
 * @return {Object} Configuration object holding all the scheduling info
 */
export function create() {
  const options = {
    layers: {
      [layers.Millisecond]: getDefaultLayerProps(),
      [layers.Second]: getDefaultLayerProps(),
      [layers.Minute]: getDefaultLayerProps(),
      [layers.Hour]: getDefaultLayerProps(),
      [layers.Day]: getDefaultLayerProps(),
      [layers.Month]: getDefaultLayerProps()
    }
  };

  return options;
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

  return options;
}

/**
 * Runs a defined implementation on a selected date
 * and returns either next possible execution or null when
 * execution in specified timeframe is not possible
 * @param  {Date} date   the date after execution
 * @param  {Object} opt  schedule configuration
 * @param  {[type]} layerType Type of a layer to execution
 * @return {Date}      Date of the next execution
 */
function getFunction(opt, layerType, next) {
  if (opt.layers.hasOwnProperty(layerType)) {
    layerImpl[layerType].validate(opt.layers[layerType]);

    return (date, initialRun) => (
      layerImpl[layerType].getNextExecution(
        date, opt.layers, next, initialRun)
      );
  }

  return null;
}

/**
 * Returns if a layer is ignored that means when the type is set to Every
 * and interval is set to 1. That means pretty much "Run always"
 * @return {[type]} [description]
 */
function isLayerDefault(opt, layerType) {
  return opt.layers[layerType].interval === 1 &&
    opt.layers[layerType].type === types.Every;
}

/**
 * [getExecutionDatesAfter description]
 * @param  {[type]} date [description]
 * @param  {[type]} opt  [description]
 * @param  {[type]} num  [description]
 * @return {[type]}      [description]
 */
export function getExecutionDatesAfter(date, opt, num) {

  var i = 0;
  var dates = [];
  var start = date;

  //determin first date
  date = getExecutionDateAfter(date, opt, true)

  if (date != null) dates.push(date);

  while (dates.length < num && date) {

    date = getExecutionDateAfter(date, opt)

    if (date != null) {
      dates.push(date);
    }
  }

  return dates;
}

/**
 * Gets the next possible execution based on the defined schedule and passed date
 * @param  {Date} the date after execution
 * @param  {Object} opt  schedule configuration
 * @return {Date}      Date of the next execution or null when next execution
 *                     is not possible
 */
export function getExecutionDateAfter(date, opt, initialRun = false) {

  if (!date) return null;

  var result = getFunction(opt, layers.Millisecond,
    getFunction(opt, layers.Second,
    getFunction(opt, layers.Minute,
    getFunction(opt, layers.Hour,
    getFunction(opt, layers.Day,
    getFunction(opt, layers.Month,
  ))))))(date, initialRun);

  return result;
}
