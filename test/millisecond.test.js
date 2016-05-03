import scheduler from '../src/index'
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
  description : 'Every 2500 milliseconds',
  start : new Date(2000, 1, 1, 0, 0, 0, 1),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 1),
    new Date(2000, 1, 1, 0, 0, 2, 501),
    new Date(2000, 1, 1, 0, 0, 5, 1),
    new Date(2000, 1, 1, 0, 0, 7, 501),
    new Date(2000, 1, 1, 0, 0, 10, 1),
    new Date(2000, 1, 1, 0, 0, 12, 501),
    new Date(2000, 1, 1, 0, 0, 15, 1),
  ],
  trigger : scheduler().EveryMillisecond(2500)
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

testCase({
  description : 'On 250th and 333th and 685th millisecond of each second',
  start : new Date(2000, 1, 1, 0, 0, 0, 700),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 1, 250),
    new Date(2000, 1, 1, 0, 0, 1, 333),
    new Date(2000, 1, 1, 0, 0, 1, 685),

    new Date(2000, 1, 1, 0, 0, 2, 250),
    new Date(2000, 1, 1, 0, 0, 2, 333),
    new Date(2000, 1, 1, 0, 0, 2, 685),

    new Date(2000, 1, 1, 0, 0, 3, 250),
    new Date(2000, 1, 1, 0, 0, 3, 333),
    new Date(2000, 1, 1, 0, 0, 3, 685),
  ],
  trigger : scheduler().OnMillisecond(250, 333, 685)
});
