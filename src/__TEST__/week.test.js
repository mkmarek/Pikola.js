import scheduler from '../../index'
import {testCase} from './templates.test'

testCase({
  description : 'Every 3 weeks',
  start : new Date(2000, 1, 3, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 21, 0, 0, 0, 0),
    new Date(2000, 2, 13, 0, 0, 0, 0),
    new Date(2000, 3, 3, 0, 0, 0, 0),
    new Date(2000, 3, 24, 0, 0, 0, 0),
    new Date(2000, 4, 15, 0, 0, 0, 0),
    new Date(2000, 5, 5, 0, 0, 0, 0),
    new Date(2000, 5, 26, 0, 0, 0, 0)
  ],
  trigger : scheduler().EveryWeek(3)
});

testCase({
  description : 'Every 3rd week in a month',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 14, 0, 0, 0, 0),
    new Date(2000, 2, 13, 0, 0, 0, 0),
    new Date(2000, 3, 10, 0, 0, 0, 0),
    new Date(2000, 4, 15, 0, 0, 0, 0),
    new Date(2000, 5, 12, 0, 0, 0, 0),
    new Date(2000, 6, 10, 0, 0, 0, 0),
    new Date(2000, 7, 14, 0, 0, 0, 0)
  ],
  trigger : scheduler().OnWeek(2)
});

testCase({
  description : 'Every 3 weeks on fifth day of a week',
  start : new Date(2000, 1, 3, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 4, 0, 0, 0, 0),
    new Date(2000, 1, 25, 0, 0, 0, 0),
    new Date(2000, 2, 17, 0, 0, 0, 0),
    new Date(2000, 3, 7, 0, 0, 0, 0),
    new Date(2000, 3, 28, 0, 0, 0, 0),
    new Date(2000, 4, 19, 0, 0, 0, 0),
    new Date(2000, 5, 9, 0, 0, 0, 0)
  ],
  trigger : scheduler()
    .EveryWeek(3)
    .OnDayOfWeek(4)
});

testCase({
  description : 'Every 3rd week in a month on second day of a week',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 15, 0, 0, 0, 0),
    new Date(2000, 2, 14, 0, 0, 0, 0),
    new Date(2000, 3, 11, 0, 0, 0, 0),
    new Date(2000, 4, 16, 0, 0, 0, 0),
    new Date(2000, 5, 13, 0, 0, 0, 0),
    new Date(2000, 6, 11, 0, 0, 0, 0),
    new Date(2000, 7, 15, 0, 0, 0, 0)
  ],
  trigger : scheduler().OnWeek(2).OnDayOfWeek(1)
});
