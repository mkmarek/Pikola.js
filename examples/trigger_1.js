/*eslint no-console: 0*/

'use strict'

const pikola = require('../index')

//Should fire every month on second day
//at 10 PM
const trigger = pikola()
.EveryMonth(1)
.OnDay(2)
.OnHour(22)

const startDate = new Date()
const dates = trigger.GetExecutionDatesAfter(startDate, 10)

console.log(dates)
