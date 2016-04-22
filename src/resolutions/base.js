import recurrence from '../recurrence'
import resolution from '../resolution'
import {
  getIsoWeekFromDate,
  getDateOfISOWeek
} from '../utils'

function isFunction(functionToCheck) {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

function clear(date, res) {
  switch (res) {
    case resolution.Week:
      date.setDate(1)
      return
    case resolution.Day:
      {
        const weeks = getIsoWeekFromDate(date)
        date = getDateOfISOWeek(weeks, date.getFullYear())
        return
      }
    case resolution.Hour:
      date.setHours(0)
      return
    case resolution.Minute:
      date.setMinutes(0)
      return
    case resolution.Second:
      date.setSeconds(0)
      return
    case resolution.Millisecond:
      date.setMilliseconds(0)
      return
  }
}

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
      return layers[res].interval <= 1 && layers[res].type == recurrence.Every
    }

    function isLowerResolutionAndNotDefault(res) {
      return resolution > layers[res].resolution &&
        (!isDefault(res) || layers[res].interval == null)
    }

    function isHigherResolutionAndNotDefault(res) {
      return resolution < layers[res].resolution &&
        (!isDefault(res) || layers[res].interval == null)
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
    if (interval === null && isDefault(resolution) && next)
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
        if (layers[e].interval == null) isHigherLayerDisabled = true
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
        isHigherLayerDisabled
      }) + interval

      if ((initialRun || isHigherResNonDefault && part > maxValue) && next)
        date = next({
          date,
          initialRun
        })

      else if (!initialRun || forceAdvance) {
        date = every({
          date,
          interval: interval
        })
      }

    } else if (type == recurrence.On) {

      const part = datepart({
        date,
        isHigherResNonDefault,
        isHigherLayerDisabled
      })

      //for initial run we're gonna go through all resolutions
      //to setup the start date
      if (initialRun && next) date = next({
        date,
        initialRun
      })

      //if the wanted recurrence is not possible to setup
      //because the date date would be smaller than
      //the actual date we move on to next resolution
      else if (part >= interval && next) date = next({
        date,
        initialRun,
        forceAdvance: true
      })

      //setting up the defined date part
      date = on({
        date,
        interval,
        isHigherLayerDisabled
      })
    }

    // Clears the closest lower resolution in the date time
    Object.keys(layers).forEach(e =>
      !initialRun &&
      isLowerResolutionAndNotDefault(layers[e].resolution) ?
      clear(date, layers[e].resolution) : true
    )

    //console.log(`Leaving ${resolution} with ${date}`)

    return date
  }
}
