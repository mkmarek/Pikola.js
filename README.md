Pikola.js - Advanced scheduling library
==========

[![Build Status](https://travis-ci.org/mkmarek/Pikola.js.svg?branch=master)](https://travis-ci.org/mkmarek/Pikola.js) [![Coverage Status](https://coveralls.io/repos/github/mkmarek/Pikola.js/badge.svg?branch=master)](https://coveralls.io/github/mkmarek/Pikola.js?branch=master)
[![npm version](https://badge.fury.io/js/pikola.svg)](https://badge.fury.io/js/pikola)
[![Dependency Status](https://gemnasium.com/badges/github.com/mkmarek/Pikola.js.svg)](https://gemnasium.com/github.com/mkmarek/Pikola.js)

This project is under heavy development. New functionality will be added continuously.
**It is not recommended to use it in production scenario just yet.**

Installation
------------
```
npm install pikola --save
```

Usage
------------

Importing pikola library

```javascript
import pikola from 'pikola'
```

Creating a trigger

```javascript
const trigger = pikola()
```

The default trigger fires every millisecond. (theoretically) you can modify it with provided functions.

- EveryMillisecond(interval)
- EverySecond(interval)
- EveryMinute(interval)
- EveryHour(interval)
- EveryDay(interval)
- EveryWeek(interval)
- EveryMonth(interval)
- OnMillisecond(orderNumber)
- OnSecond(orderNumber)
- OnMinute(orderNumber)
- OnHour(orderNumber)
- OnDayOfWeek(orderNumber)
- OnDayOfMonth(orderNumber)
- OnWeek(orderNumber)

Functions starting with **Every** will return a trigger which will execute in specified interval. For example:

```javascript
const trigger = pikola()
    .EveryMonth(4)
```

will execute every 4 months. The interval has to be at least 1.

Functions starting with **On** will return a trigger executing exactly on that specific date or time (in theory - milliseconds are tricky). The order number parameter of these functions is zero based.

For example this trigger will execute on the first day of every week (Monday):

```javascript
const trigger = pikola()
    .OnDayOfWeek(0)
```

You can combine these function to customize the result trigger.

```javascript
const trigger = pikola()
    .EveryMonth(4)
    .OnWeek(1)
    .OnDayOfWeek(4)
    .EveryHour(4)
    .OnMinute(21)
    .OnSecond(12)
    .EveryMillisecond(333)
```

This trigger will execute every four months on the second week of that particular month on the fourth day of that week every four hours on every 21st minute on 12th second and inside that second every 333 milliseconds. (Total insanity)

Order of calling these functions doesn't matter following example will produce the same result. It's recommended though to start from the highest resolution. It's more readable that way

```javascript
const trigger = pikola()
  .EveryMillisecond(333)
  .OnSecond(12)
  .OnWeek(1)
  .EveryMonth(4)
  .EveryHour(4)
  .OnDayOfWeek(4)
  .OnMinute(21)
```

After defining a trigger you can check future (or past) execution date calling the **GetExecutionDatesAfter** function as following:

```javascript
const trigger = pikola()....

const numberOfDates = 10
const from = new Date()

const dates = trigger.GetExecutionDatesAfter(from, numberOfDates)
```

This will return an array of dates specifying planned execution dates from the
specified date.

For actually executing the trigger you need to first hook to an OnFire event and
then call the start function as following example illustrates:

```javascript
import pikola from 'pikola'

const trigger = pikola()
.EverySecond(2)
.OnMillisecond(333)
.OnFire(() => {
  //do your trigger stuff here
})

trigger.Start()
```

Inside the OnFire callback you can return false to stop it.

Roadmap
------------

There is so much more stuff I want to add to this library but here is a simple
list of some of the ones that will come first:

- [ ] Possibility to define multiple On recurrences something like OnHour(1,4,8,22)
- [ ] Internationalization - Some values are now fixed. like for example that Monday is
the first day of the week. That needs to be changed
- [ ] Better validation mechanism. Some combinations of functions forming trigger
doesn't make too much sense. Throw warning about them
(e.g. trigger.EveryHour(2).EveryMinute(80))
- [ ] Control functions for limiting boundaries of certain layers (e.g. FromHour - ToHour)
- [ ] Control functions for stopping the trigger.
(Returning false in callback just won't cut it)
- [ ] CRON adapter
- [ ] Think about what to do with timezones
