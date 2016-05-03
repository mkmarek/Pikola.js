import recurrence from '../recurrence'

import {
  clearResolution,
  isFunction,
  getFirstFreeInterval
} from '../utils'

/**
 * Implements the common flow for all resolutions
 * @param  {Object} config   Configuration object defining timeframe on which
 *                           this specific resolution works
 * @return {Function}        Resolution function performing operation for
 *                           a certain date part based on the config object
 */
export default function (config) {

  const {
    MAX,
    every,
    on,
    datepart,
    resolution
  } = config

  return ({
    layers
  }) => (props) => {

    function isDefault(res) {
      return layers[res].interval.length == 1 && layers[res].interval[0] <= 1 && layers[res].type == recurrence.Every
    }

    function isLowerResolutionAndNotDefault(res) {
      return resolution > layers[res].resolution &&
        (!isDefault(res) || layers[res].interval[0] == null)
    }

    function isHigherResolutionAndNotDefault(res) {
      return resolution < layers[res].resolution &&
        (!isDefault(res) || layers[res].interval[0] == null)
    }

    const {
      next,
      initialRun,
      forceAdvance
    } = props

    let {
      date
    } = props

    const {
      type,
      interval
    } = layers[resolution]

    //console.log(`Entering ${resolution} with ${date}`)

    // if interval is null that means this layer is disabled
    if (interval[0] === null && isDefault(resolution) && next)
      return next({
        date,
        initialRun
      })

    //Iterate through layers and observer whether
    //any of the higher layers are non-default and therefore
    //whether it makes sense to visit them first
    const isHigherResNonDefault = Object.keys(layers).reduce((c, e) => (
      c || isHigherResolutionAndNotDefault(e)), false)

    //Iterate through layers and determine whether
    //is higher layer disabled
    let isHigherLayerDisabled = false
    Object.keys(layers).forEach(e => {
      if (layers[e].resolution > resolution) {
        if (layers[e].interval[0] == null) isHigherLayerDisabled = true
        return false
      }
      return true
    })

    const maxValue = isFunction(MAX) ? MAX({
      date,
      isHigherResNonDefault,
      layers
    }) : MAX

    if (type == recurrence.Every) {

      //Get the next date part and add wanted interval
      const part = datepart({
        date,
        isHigherResNonDefault,
        isHigherLayerDisabled,
        interval
      }) + interval[0]

      if ((initialRun || isHigherResNonDefault && part > maxValue) && next)
        date = next({
          date,
          initialRun
        })

      else if (!initialRun || forceAdvance) {
        date = every({
          date,
          interval: interval[0]
        })
      }

    } else if (type == recurrence.On) {

      const part = datepart({
        date,
        isHigherResNonDefault,
        isHigherLayerDisabled,
        interval
      })

      let freeInterval = getFirstFreeInterval(interval, part)

      //for initial run we're gonna go through all resolutions
      //to setup the start date
      //or if the wanted recurrence is not possible to setup
      //because the date date would be smaller than
      //the actual date we move on to next resolution
      if (!freeInterval || initialRun && next) date = next({
        date,
        initialRun,
        forceAdvance: !(freeInterval || initialRun)
      })

      //setting up the defined date part
      date = on({
        date,
        interval : freeInterval || interval[0],
        isHigherLayerDisabled
      })
    }

    // Clears the closest lower resolution in the date time
    Object.keys(layers).forEach(e =>
      !initialRun &&
      isLowerResolutionAndNotDefault(layers[e].resolution) ?
      clearResolution(date, layers[e].resolution) : true
    )

    //console.log(`Leaving ${resolution} with ${date}`)

    return date
  }
}
