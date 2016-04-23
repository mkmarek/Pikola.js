import scheduler from '../src/index'
import {testCase} from './templates.test'

testCase({
  description : 'Every 5 months',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 6, 1, 0, 0, 0, 0),
    new Date(2000, 11, 1, 0, 0, 0, 0),
    new Date(2001, 4, 1, 0, 0, 0, 0),
    new Date(2001, 9, 1, 0, 0, 0, 0),
    new Date(2002, 2, 1, 0, 0, 0, 0),
    new Date(2002, 7, 1, 0, 0, 0, 0)
  ],
  trigger : scheduler().EveryMonth(5)
});

testCase({
  description : 'Every 2 months on third day',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 3, 0, 0, 0, 0),
    new Date(2000, 3, 3, 0, 0, 0, 0),
    new Date(2000, 5, 3, 0, 0, 0, 0),
    new Date(2000, 7, 3, 0, 0, 0, 0),
    new Date(2000, 9, 3, 0, 0, 0, 0),
    new Date(2000, 11, 3, 0, 0, 0, 0),
    new Date(2001, 1, 3, 0, 0, 0, 0)
  ],
  trigger : scheduler().EveryMonth(2).OnDayOfMonth(2)
});

testCase({
  description : 'Every 2 months every 10 days',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 11, 0, 0, 0, 0),
    new Date(2000, 1, 21, 0, 0, 0, 0),
    new Date(2000, 3, 1, 0, 0, 0, 0),
    new Date(2000, 3, 11, 0, 0, 0, 0),
    new Date(2000, 3, 21, 0, 0, 0, 0),
    new Date(2000, 5, 1, 0, 0, 0, 0)
  ],
  trigger : scheduler().EveryMonth(2).EveryDay(10)
});

testCase({
  description : 'Every 4 months on second week',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 7, 0, 0, 0, 0),
    new Date(2000, 5, 5, 0, 0, 0, 0),
    new Date(2000, 9, 9, 0, 0, 0, 0),
    new Date(2001, 1, 5, 0, 0, 0, 0),
    new Date(2001, 5, 4, 0, 0, 0, 0),
    new Date(2001, 9, 8, 0, 0, 0, 0),
    new Date(2002, 1, 4, 0, 0, 0, 0)
  ],
  trigger : scheduler().EveryMonth(4).OnWeek(1)
});
