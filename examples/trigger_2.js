/*eslint no-console: 0*/

'use strict'

const pikola = require('../index')

//Should fire every month on second day
//at 10 PM
const trigger = pikola()
.EverySecond(2)
.OnMillisecond(333)
.OnFire(() => {

  const dt = new Date()

  console.log(dt.toString() + ' ' + dt.getMilliseconds())
})

console.log('Starting trigger on every 2 seconds on 333rd millisecond')
trigger.Start()
