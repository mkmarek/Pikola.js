import scheduler from '../src/index'
import chai from 'chai'
import {dateToStr} from './templates.test'

const should = chai.should()

describe('#OnFire', function() {

  let trigger;
  const start = new Date();
  start.setSeconds(start.getSeconds() + 1)

  before(function() {
    trigger = scheduler()
      .EveryMillisecond(50);
  })

  it('should repetitively fire according to schedule starting in one second', function(done) {
    let cnt = 0;
    this.timeout(3000);

    const expectedDates = trigger.GetExecutionDatesAfter(start, 10);

    const t = trigger.OnFire(function(date) {
      try {
        dateToStr(date).should.equal(dateToStr(expectedDates[cnt]))

        cnt++
        if (cnt >= 10) {
          done()
          return false;
        }
      } catch(e) {
        done(e)
        return false;
      }
    }).Start(start)
  })

  it('should repetitively fire according to schedule starting immediately', function(done) {
    let cnt = 0;
    this.timeout(3000);
    let dt = new Date();

    const expectedDates = trigger.GetExecutionDatesAfter(dt, 10);

    const t = trigger.OnFire(function(date) {
      try {
        dateToStr(date).should.equal(dateToStr(expectedDates[cnt]))

        cnt++
        if (cnt >= 10) {
          done()
          return false;
        }
      } catch(e) {
        done(e)
        return false;
      }
    }).Start(dt)
  })
})
