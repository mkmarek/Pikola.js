import scheduler from '../../index'

import * as layers from '../recurrenceLayerTypes'
import * as types from '../recurrenceTypes'

import chai from 'chai'

chai.should();


describe('scheduler', function() {

  describe('#getExecutionDatesAfter()', function() {

    describe('(recurrence = Minute && Type = Every)', function() {

      let trigger, dates, d;

      before(function() {
        trigger = scheduler()
          .EveryMinute(20)

        d = new Date(2000, 1, 1, 0, 0, 0, 0);
        Object.freeze(d);

        dates = trigger.GetExecutionDatesAfter(d, 6);
      });

      it('Should return a set of 6 dates', function() {
        dates.length.should.equal(6);
      });

      it('First date should b equal to the start', function() {
        dates[0].getTime().should.equal(d.getTime())
      });

      it('Second date should have 0h and 20m', function() {
        dates[1].getMinutes().should.equal(20);
        dates[1].getHours().should.equal(0);
      });

      it('Third date should have 0h and 40m', function() {
        dates[2].getMinutes().should.equal(40);
        dates[2].getHours().should.equal(0);
      });

      it('Fourth date should have 1h and 0m', function() {
        dates[3].getMinutes().should.equal(0);
        dates[3].getHours().should.equal(1);
      });

      it('Fifth date should have 1h and 20m', function() {
        dates[4].getMinutes().should.equal(20);
        dates[4].getHours().should.equal(1);
      });

      it('Sixth date should have 1h and 40m', function() {
        dates[5].getMinutes().should.equal(40);
        dates[5].getHours().should.equal(1);
      });
    });
  });
});
