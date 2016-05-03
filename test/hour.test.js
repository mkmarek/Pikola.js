import scheduler from '../src/index'
import {testCase} from './templates.test'

testCase({
  description : 'Every 10 hours',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 1, 10, 0, 0, 0),
    new Date(2000, 1, 1, 20, 0, 0, 0),
    new Date(2000, 1, 2, 6, 0, 0, 0),
    new Date(2000, 1, 2, 16, 0, 0, 0),
    new Date(2000, 1, 3, 2, 0, 0, 0),
    new Date(2000, 1, 3, 12, 0, 0, 0)
  ],
  trigger : scheduler().EveryHour(10)
});

testCase({
  description : 'Every 10th hour',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 10, 0, 0, 0),
    new Date(2000, 1, 2, 10, 0, 0, 0),
    new Date(2000, 1, 3, 10, 0, 0, 0),
    new Date(2000, 1, 4, 10, 0, 0, 0),
    new Date(2000, 1, 5, 10, 0, 0, 0),
    new Date(2000, 1, 6, 10, 0, 0, 0),
    new Date(2000, 1, 7, 10, 0, 0, 0)
  ],
  trigger : scheduler().OnHour(10)
});

testCase({
  description : 'Every 10 hours every 33 minutes',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 1, 0, 33, 0, 0),

    new Date(2000, 1, 1, 10, 0, 0, 0),
    new Date(2000, 1, 1, 10, 33, 0, 0),

    new Date(2000, 1, 1, 20, 0, 0, 0),
    new Date(2000, 1, 1, 20, 33, 0, 0),
  ],
  trigger : scheduler().EveryHour(10).EveryMinute(33)
});

testCase({
  description : 'Every 10th hour every 33 minutes',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 10, 0, 0, 0),
    new Date(2000, 1, 1, 10, 33, 0, 0),

    new Date(2000, 1, 2, 10, 0, 0, 0),
    new Date(2000, 1, 2, 10, 33, 0, 0),

    new Date(2000, 1, 3, 10, 0, 0, 0),
    new Date(2000, 1, 3, 10, 33, 0, 0),
  ],
  trigger : scheduler().OnHour(10).EveryMinute(33)
});

testCase({
  description : 'Every 10 hours every 33rd minute',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 33, 0, 0),
    new Date(2000, 1, 1, 10, 33, 0, 0),
    new Date(2000, 1, 1, 20, 33, 0, 0),
    new Date(2000, 1, 2, 6, 33, 0, 0),
    new Date(2000, 1, 2, 16, 33, 0, 0),
  ],
  trigger : scheduler().EveryHour(10).OnMinute(33)
});

testCase({
  description : 'Every 10th hour every 33rd minute',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 10, 33, 0, 0),
    new Date(2000, 1, 2, 10, 33, 0, 0),
    new Date(2000, 1, 3, 10, 33, 0, 0),
    new Date(2000, 1, 4, 10, 33, 0, 0),
    new Date(2000, 1, 5, 10, 33, 0, 0),
  ],
  trigger : scheduler().OnHour(10).OnMinute(33)
});

testCase({
  description : 'On 10th and 12th and 20th hour every day',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 10, 0, 0, 0),
    new Date(2000, 1, 1, 12, 0, 0, 0),
    new Date(2000, 1, 1, 20, 0, 0, 0),

    new Date(2000, 1, 2, 10, 0, 0, 0),
    new Date(2000, 1, 2, 12, 0, 0, 0),
    new Date(2000, 1, 2, 20, 0, 0, 0),

    new Date(2000, 1, 3, 10, 0, 0, 0),
    new Date(2000, 1, 3, 12, 0, 0, 0),
    new Date(2000, 1, 3, 20, 0, 0, 0),
  ],
  trigger : scheduler().OnHour(10, 12, 20)
});
