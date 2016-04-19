import scheduler from '../../index'

import * as layers from '../recurrenceLayerTypes'
import * as types from '../recurrenceTypes'

import chai from 'chai'

chai.should();


describe('scheduler', function() {

  describe('#getExecutionDatesAfter()', function() {

    describe('(recurrence = Month && Type = Every)', function() {

      let trigger, dates, d;

      before(function() {
        trigger = scheduler()
          .EveryMonth(5);

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
        dates[1].getFullYear().should.equal(2000);
        dates[1].getMonth().should.equal(6);
      });

      it('Third date should have 0h and 40m', function() {
        dates[2].getFullYear().should.equal(2000);
        dates[2].getMonth().should.equal(11);
      });

      it('Fourth date should have 1h and 0m', function() {
        dates[3].getFullYear().should.equal(2001);
        dates[3].getMonth().should.equal(4);
      });

      it('Fifth date should have 1h and 20m', function() {
        dates[4].getFullYear().should.equal(2001);
        dates[4].getMonth().should.equal(9);
      });

      it('Sixth date should have 1h and 40m', function() {
        dates[5].getFullYear().should.equal(2002);
        dates[5].getMonth().should.equal(2);
      });
    });
  });
});
