import * as layers from './recurrenceLayerTypes'
import * as millisecond from './millisecond'
import * as second from './second'
import * as minute from './minute'
import * as hour from './hour'
import * as day from './day'
import * as month from './month'

const impl = {
  [layers.Millisecond] : millisecond,
  [layers.Second] : second,
  [layers.Minute] : minute,
  [layers.Hour] : hour,
  [layers.Day] : day,
  [layers.Month] : month
};

export default impl;
