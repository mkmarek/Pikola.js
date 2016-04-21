import { getExecutionDatesAfter, create } from './scheduler'
import * as functions from './functions'

/**
 * Composes all the defined functions and wraps them
 * so they always return wrapper instead of options object
 *
 * @param  {Object} opt Options object
 * @return {Object}     Object containing all the wrapped functions
 */
function wrapFunctions(opt) {
  return Object.keys(functions)
    .reduce((composed, f) => ({
      ...composed,
      [f]: (...args) => wrap(functions[f](...args, opt))
    }), {})
}

/**
 * Wraps options object with predefined functions
 *
 * @param  {Object} opt Options object
 * @return {Object}     Object containing all the wrapped functions
 */
function wrap(opt) {
  return {
    ...wrapFunctions(opt),

    GetExecutionDatesAfter: (date, numberOfDates) =>
      getExecutionDatesAfter(date, opt, numberOfDates)
  }
}

/**
 * Creates new trigger
 *
 * @return {Object} Wrapper over newly created triggerOut
 *                  Exposing number of functions
 */
export default function () {
  const opt = create()

  return wrap(opt)
}
