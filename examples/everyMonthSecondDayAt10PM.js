'use strict'

const pikola = require('../index');

//Should fire every second month every tenth day
//every 30 mintues at 10 PM
const trigger = pikola()
.EveryMonth(2)
.EveryDay(10)
.OnHour(22)
.EveryMinute(30);

const startDate = new Date(2000, 1, 1, 0, 0, 0, 0);
const dates = trigger.GetExecutionDatesAfter(startDate, 10);

console.log(dates);
