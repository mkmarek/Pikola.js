import recurrence from '../recurrence'
import resolution from '../resolution'

function isFunction(functionToCheck) {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

function clear(date, res) {
  switch (res) {
    case resolution.Day:
      date.setDate(1)
      return
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
    MIN,
    name,
    every,
    on,
    datepart,
    resolution
  } = config

  return ({
    layers
  }) => (props) => {

    function isLowerResolutionAndNotDefault(res) {
      return resolution > res && (layers[res].interval > 1 ||
        layers[res].type != recurrence.Every)
    }

    function isHigherResolutionAndNotDefault(res) {
      return resolution < res && (layers[res].interval > 1 ||
        layers[res].type != recurrence.Every)
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

    if (!isNaN(Number(MIN)) && interval < MIN)
      throw `${name} interval can\`t be set lower than ${MIN}`
    if (!isNaN(Number(MAX)) && interval > MAX)
      throw `${name} interval can\`t be set higher than ${MAX}`
    if (isNaN(Number(interval)))
      throw `${name} interval is not specified`

    const maxValue = isFunction(MAX) ? MAX({
      date
    }) : MAX

    if (type == recurrence.Every) {

      //Iterate through layers and observer whether
      //any of the higher layers are non-default and therefore
      //whether it makes sense to visit them first
      const shouldMoveForward = Object.keys(layers).reduce((c, e) =>
        c || isHigherResolutionAndNotDefault(layers[e].resolution), false)

      //Get the next date part and add wanted interval
      const part = datepart({
        date
      }) + interval

      if ((initialRun || shouldMoveForward && part > maxValue) && next)
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
        date
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
        interval: interval
      })
    }

    // Clears the closest lower resolution in the date date time
    Object.keys(layers).forEach(e =>
      !initialRun &&
      isLowerResolutionAndNotDefault(layers[e].resolution) ?
      clear(date, layers[e].resolution) : true
    )

    return date
  }
}
