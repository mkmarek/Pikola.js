import composeResolutions from '../composeResolutions'
import base from './base'

import millisecond from './millisecond'
import second from './second'
import minute from './minute'
import hour from './hour'
import day from './day'
import month from './month'
import week from './week'

const resolutions = [
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  month
]

const compose = (opt) => composeResolutions(
  resolutions.map(e => base(e)(opt)))

export default compose
