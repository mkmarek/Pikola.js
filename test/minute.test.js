import scheduler from '../src/index'
import {testCase} from './templates.test'

testCase({
  description : 'Every 20 minutes',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 1, 0, 20, 0, 0),
    new Date(2000, 1, 1, 0, 40, 0, 0),
    new Date(2000, 1, 1, 1, 0, 0, 0),
    new Date(2000, 1, 1, 1, 20, 0, 0),
    new Date(2000, 1, 1, 1, 40, 0, 0),
    new Date(2000, 1, 1, 2, 0, 0, 0)
  ],
  trigger : scheduler().EveryMinute(20)
});

testCase({
  description : 'Every 20th minute',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 20, 0, 0),
    new Date(2000, 1, 1, 1, 20, 0, 0),
    new Date(2000, 1, 1, 2, 20, 0, 0),
    new Date(2000, 1, 1, 3, 20, 0, 0),
    new Date(2000, 1, 1, 4, 20, 0, 0),
    new Date(2000, 1, 1, 5, 20, 0, 0),
    new Date(2000, 1, 1, 6, 20, 0, 0)
  ],
  trigger : scheduler().OnMinute(20)
});

testCase({
  description : 'Every 20 minutes every 33 seconds',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 1, 0, 0, 33, 0),
    new Date(2000, 1, 1, 0, 20, 0, 0),
    new Date(2000, 1, 1, 0, 20, 33, 0),
    new Date(2000, 1, 1, 0, 40, 0, 0),
    new Date(2000, 1, 1, 0, 40, 33, 0),
  ],
  trigger : scheduler().EveryMinute(20).EverySecond(33)
});

testCase({
  description : 'Every 20th minute every 33 seconds',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 20, 0, 0),
    new Date(2000, 1, 1, 0, 20, 33, 0),
    new Date(2000, 1, 1, 1, 20, 0, 0),
    new Date(2000, 1, 1, 1, 20, 33, 0),
    new Date(2000, 1, 1, 2, 20, 0, 0),
    new Date(2000, 1, 1, 2, 20, 33, 0),
  ],
  trigger : scheduler().OnMinute(20).EverySecond(33)
});

testCase({
  description : 'Every 20 minutes on 33rd second',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 33, 0),
    new Date(2000, 1, 1, 0, 20, 33, 0),
    new Date(2000, 1, 1, 0, 40, 33, 0),
    new Date(2000, 1, 1, 1, 0, 33, 0),
    new Date(2000, 1, 1, 1, 20, 33, 0),
    new Date(2000, 1, 1, 1, 40, 33, 0),
    new Date(2000, 1, 1, 2, 0, 33, 0)
  ],
  trigger : scheduler().EveryMinute(20).OnSecond(33)
});

testCase({
  description : 'Every 20th minute on 33rd second',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 20, 33, 0),
    new Date(2000, 1, 1, 1, 20, 33, 0),
    new Date(2000, 1, 1, 2, 20, 33, 0),
    new Date(2000, 1, 1, 3, 20, 33, 0),
    new Date(2000, 1, 1, 4, 20, 33, 0),
    new Date(2000, 1, 1, 5, 20, 33, 0),
    new Date(2000, 1, 1, 6, 20, 33, 0)
  ],
  trigger : scheduler().OnMinute(20).OnSecond(33)
});

testCase({
  description : 'On 20th and 40th and 45th minute each hour',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 20, 0, 0),
    new Date(2000, 1, 1, 0, 40, 0, 0),
    new Date(2000, 1, 1, 0, 45, 0, 0),

    new Date(2000, 1, 1, 1, 20, 0, 0),
    new Date(2000, 1, 1, 1, 40, 0, 0),
    new Date(2000, 1, 1, 1, 45, 0, 0),

    new Date(2000, 1, 1, 2, 20, 0, 0),
    new Date(2000, 1, 1, 2, 40, 0, 0),
    new Date(2000, 1, 1, 2, 45, 0, 0),
  ],
  trigger : scheduler().OnMinute(20, 40, 45)
});
