import scheduler from '../../index'
import {testCase} from './templates.test'

testCase({
  description : 'Every 250 milliseconds',
  start : new Date(2000, 1, 1, 0, 0, 0, 1),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 1),
    new Date(2000, 1, 1, 0, 0, 0, 251),
    new Date(2000, 1, 1, 0, 0, 0, 501),
    new Date(2000, 1, 1, 0, 0, 0, 751),
    new Date(2000, 1, 1, 0, 0, 1, 1),
    new Date(2000, 1, 1, 0, 0, 1, 251),
    new Date(2000, 1, 1, 0, 0, 1, 501),
  ],
  trigger : scheduler().EveryMillisecond(250)
});

testCase({
  description : 'On 250th millisecond of each second',
  start : new Date(2000, 1, 1, 0, 0, 0, 300),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 1, 250),
    new Date(2000, 1, 1, 0, 0, 2, 250),
    new Date(2000, 1, 1, 0, 0, 3, 250),
    new Date(2000, 1, 1, 0, 0, 4, 250),
    new Date(2000, 1, 1, 0, 0, 5, 250),
    new Date(2000, 1, 1, 0, 0, 6, 250),
    new Date(2000, 1, 1, 0, 0, 7, 250),
  ],
  trigger : scheduler().OnMillisecond(250)
});
