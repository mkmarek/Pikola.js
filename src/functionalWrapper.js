import { getExecutionDatesAfter, create, onFire, start } from './scheduler'
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
      [f]: (...args) => wrap( { ...opt, [f] : functions[f](...args) } )
    }), { })
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
      getExecutionDatesAfter(date, resolveOptions(opt, create()), numberOfDates),

    OnFire: (cb) =>
      wrap(onFire(cb, opt)),

    Start: (when = new Date()) =>
      start(when, resolveOptions(opt, create()))
  }
}

function resolveOptions(props, initialOpt) {

  const opt = Object.keys(props)
  .map(e => props[e])
  .sort((a,b) => b.resolution - a.resolution)
  .reduce((c,e) => e.execute ? e.execute(c) : { ...c, ...e }, initialOpt)

  return opt
}

/**
 * Creates new trigger
 *
 * @return {Object} Wrapper over newly created triggerOut
 *                  Exposing number of functions
 */
export default function () {
  return wrap({})
}
