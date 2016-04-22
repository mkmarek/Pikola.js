import scheduler from '../../index'
import testCase from './templates.test'

testCase({
  description : 'Every 12 days',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 13, 0, 0, 0, 0),
    new Date(2000, 1, 25, 0, 0, 0, 0),
    new Date(2000, 2, 8, 0, 0, 0, 0),
    new Date(2000, 2, 20, 0, 0, 0, 0),
    new Date(2000, 3, 1, 0, 0, 0, 0),
    new Date(2000, 3, 13, 0, 0, 0, 0)
  ],
  trigger : scheduler().EveryDay(12)
});

testCase({
  description : 'Every 12th day in a month',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 12, 0, 0, 0, 0),
    new Date(2000, 2, 12, 0, 0, 0, 0),
    new Date(2000, 3, 12, 0, 0, 0, 0),
    new Date(2000, 4, 12, 0, 0, 0, 0),
    new Date(2000, 5, 12, 0, 0, 0, 0),
    new Date(2000, 6, 12, 0, 0, 0, 0),
    new Date(2000, 7, 12, 0, 0, 0, 0)
  ],
  trigger : scheduler().OnDayOfMonth(12)
});

testCase({
  description : 'Every 4th day in a week',
  start : new Date(2000, 1, 20, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 25, 0, 0, 0, 0),
    new Date(2000, 2, 3, 0, 0, 0, 0),
    new Date(2000, 2, 10, 0, 0, 0, 0),
    new Date(2000, 2, 17, 0, 0, 0, 0),
    new Date(2000, 2, 24, 0, 0, 0, 0),
    new Date(2000, 2, 31, 0, 0, 0, 0),
    new Date(2000, 3, 7, 0, 0, 0, 0)
  ],
  trigger : scheduler().OnDayOfWeek(4)
});

testCase({
  description : 'Every 12 days every 8 hours',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 0, 0),
    new Date(2000, 1, 1, 8, 0, 0, 0),
    new Date(2000, 1, 1, 16, 0, 0, 0),

    new Date(2000, 1, 13, 0, 0, 0, 0),
    new Date(2000, 1, 13, 8, 0, 0, 0),
    new Date(2000, 1, 13, 16, 0, 0, 0),

    new Date(2000, 1, 25, 0, 0, 0, 0),
    new Date(2000, 1, 25, 8, 0, 0, 0),
    new Date(2000, 1, 25, 16, 0, 0, 0),
  ],
  trigger : scheduler().EveryDay(12).EveryHour(8)
});

testCase({
  description : 'Every 12th day in a month every 8 hours',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 12, 0, 0, 0, 0),
    new Date(2000, 1, 12, 8, 0, 0, 0),
    new Date(2000, 1, 12, 16, 0, 0, 0),

    new Date(2000, 2, 12, 0, 0, 0, 0),
    new Date(2000, 2, 12, 8, 0, 0, 0),
    new Date(2000, 2, 12, 16, 0, 0, 0),

    new Date(2000, 3, 12, 0, 0, 0, 0),
    new Date(2000, 3, 12, 8, 0, 0, 0),
    new Date(2000, 3, 12, 16, 0, 0, 0)
  ],
  trigger : scheduler().OnDayOfMonth(12).EveryHour(8)
});

testCase({
  description : 'Every 4th day in a week every 8 hours',
  start : new Date(2000, 1, 20, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 25, 0, 0, 0, 0),
    new Date(2000, 1, 25, 8, 0, 0, 0),
    new Date(2000, 1, 25, 16, 0, 0, 0),

    new Date(2000, 2, 3, 0, 0, 0, 0),
    new Date(2000, 2, 3, 8, 0, 0, 0),
    new Date(2000, 2, 3, 16, 0, 0, 0),

    new Date(2000, 2, 10, 0, 0, 0, 0),
    new Date(2000, 2, 10, 8, 0, 0, 0),
    new Date(2000, 2, 10, 16, 0, 0, 0)
  ],
  trigger : scheduler().OnDayOfWeek(4).EveryHour(8)
});

testCase({
  description : 'Every 12 days at 8AM',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 1, 8, 0, 0, 0),
    new Date(2000, 1, 13, 8, 0, 0, 0),
    new Date(2000, 1, 25, 8, 0, 0, 0),
    new Date(2000, 2, 8, 8, 0, 0, 0),
    new Date(2000, 2, 20, 8, 0, 0, 0),
    new Date(2000, 3, 1, 8, 0, 0, 0),
    new Date(2000, 3, 13, 8, 0, 0, 0)
  ],
  trigger : scheduler().EveryDay(12).OnHour(8)
});

testCase({
  description : 'Every 12th day in a month at 8AM',
  start : new Date(2000, 1, 1, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 12, 8, 0, 0, 0),
    new Date(2000, 2, 12, 8, 0, 0, 0),
    new Date(2000, 3, 12, 8, 0, 0, 0),
    new Date(2000, 4, 12, 8, 0, 0, 0),
    new Date(2000, 5, 12, 8, 0, 0, 0),
    new Date(2000, 6, 12, 8, 0, 0, 0),
    new Date(2000, 7, 12, 8, 0, 0, 0)
  ],
  trigger : scheduler().OnDayOfMonth(12).OnHour(8)
});

testCase({
  description : 'Every 4th day in a week at 8AM',
  start : new Date(2000, 1, 20, 0, 0, 0, 0),
  expectedDates : [
    new Date(2000, 1, 25, 8, 0, 0, 0),
    new Date(2000, 2, 3, 8, 0, 0, 0),
    new Date(2000, 2, 10, 8, 0, 0, 0),
    new Date(2000, 2, 17, 8, 0, 0, 0),
    new Date(2000, 2, 24, 8, 0, 0, 0),
    new Date(2000, 2, 31, 8, 0, 0, 0),
    new Date(2000, 3, 7, 8, 0, 0, 0)
  ],
  trigger : scheduler().OnDayOfWeek(4).OnHour(8)
});
