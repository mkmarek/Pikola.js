import scheduler from '../src/index'
import {testCase} from './templates.test'

testCase({
  description : 'Every 20 seconds',
  start : new Date(2000, 1, 1, 0, 0, 1, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 1, 0),
    new Date(2000, 1, 1, 0, 0, 21, 0),
    new Date(2000, 1, 1, 0, 0, 41, 0),
    new Date(2000, 1, 1, 0, 1, 1, 0),
    new Date(2000, 1, 1, 0, 1, 21, 0),
    new Date(2000, 1, 1, 0, 1, 41, 0),
    new Date(2000, 1, 1, 0, 2, 1, 0)
  ],
  trigger : scheduler().EverySecond(20)
});

testCase({
  description : 'On 20th second of each minute',
  start : new Date(2000, 1, 1, 0, 0, 30, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 1, 20, 0),
    new Date(2000, 1, 1, 0, 2, 20, 0),
    new Date(2000, 1, 1, 0, 3, 20, 0),
    new Date(2000, 1, 1, 0, 4, 20, 0),
    new Date(2000, 1, 1, 0, 5, 20, 0),
    new Date(2000, 1, 1, 0, 6, 20, 0),
    new Date(2000, 1, 1, 0, 7, 20, 0),
  ],
  trigger : scheduler().OnSecond(20)
});


testCase({
  description : 'Every 40 seconds on 600th millisecond',
  start : new Date(2000, 1, 1, 0, 0, 1, 800),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 41, 600),
    new Date(2000, 1, 1, 0, 1, 21, 600),
    new Date(2000, 1, 1, 0, 2, 1, 600),
    new Date(2000, 1, 1, 0, 2, 41, 600),
    new Date(2000, 1, 1, 0, 3, 21, 600)
  ],
  trigger : scheduler()
    .EverySecond(40)
    .OnMillisecond(600)
});

testCase({
  description : 'Every 20 seconds every 250 millisecond',
  start : new Date(2000, 1, 1, 0, 0, 1, 800),
  expectedDates : [
    new Date(2000, 1, 1, 0, 0, 1, 800),
    new Date(2000, 1, 1, 0, 0, 21, 0),
    new Date(2000, 1, 1, 0, 0, 21, 250),
    new Date(2000, 1, 1, 0, 0, 21, 500),
    new Date(2000, 1, 1, 0, 0, 21, 750),
    new Date(2000, 1, 1, 0, 0, 41, 0),
    new Date(2000, 1, 1, 0, 0, 41, 250),
    new Date(2000, 1, 1, 0, 0, 41, 500),
    new Date(2000, 1, 1, 0, 0, 41, 750),
    new Date(2000, 1, 1, 0, 1, 1, 0),
    new Date(2000, 1, 1, 0, 1, 1, 250)
  ],
  trigger : scheduler()
    .EverySecond(20)
    .EveryMillisecond(250)
});

testCase({
  description : 'On 20th second of each minute every 200ms',
  start : new Date(2000, 1, 1, 0, 0, 30, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 1, 20, 0),
    new Date(2000, 1, 1, 0, 1, 20, 200),
    new Date(2000, 1, 1, 0, 1, 20, 400),
    new Date(2000, 1, 1, 0, 1, 20, 600),
    new Date(2000, 1, 1, 0, 1, 20, 800),
    new Date(2000, 1, 1, 0, 2, 20, 0),
    new Date(2000, 1, 1, 0, 2, 20, 200),
  ],
  trigger : scheduler()
    .OnSecond(20)
    .EveryMillisecond(200)
});

testCase({
  description : 'On 20th second of each minute on 250th millisecond',
  start : new Date(2000, 1, 1, 0, 0, 30, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 1, 20, 250),
    new Date(2000, 1, 1, 0, 2, 20, 250),
    new Date(2000, 1, 1, 0, 3, 20, 250),
    new Date(2000, 1, 1, 0, 4, 20, 250),
    new Date(2000, 1, 1, 0, 5, 20, 250),
    new Date(2000, 1, 1, 0, 6, 20, 250),
    new Date(2000, 1, 1, 0, 7, 20, 250),
  ],
  trigger : scheduler()
    .OnSecond(20)
    .OnMillisecond(250)
});

testCase({
  description : 'On 20th and 30th and 50th second of each minute',
  start : new Date(2000, 1, 1, 0, 0, 55, 0),
  expectedDates : [
    new Date(2000, 1, 1, 0, 1, 20, 0),
    new Date(2000, 1, 1, 0, 1, 30, 0),
    new Date(2000, 1, 1, 0, 1, 50, 0),
    new Date(2000, 1, 1, 0, 2, 20, 0),
    new Date(2000, 1, 1, 0, 2, 30, 0),
    new Date(2000, 1, 1, 0, 2, 50, 0),
  ],
  trigger : scheduler()
    .OnSecond(20, 30, 50)
});
