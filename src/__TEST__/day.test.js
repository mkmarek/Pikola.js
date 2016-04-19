import scheduler from '../../index'

import * as layers from '../recurrenceLayerTypes'
import * as types from '../recurrenceTypes'

import chai from 'chai'

chai.should();


describe('scheduler', function() {

  describe('#getExecutionDatesAfter()', function() {

    describe('(recurrence = Day && Type = Every)', function() {

      let trigger, dates, d;

      before(function() {
        trigger = scheduler()
        .EveryDay(12);

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
        dates[1].getDate().should.equal(13);
        dates[1].getMonth().should.equal(1);
      });

      it('Third date should have 0h and 40m', function() {
        dates[2].getDate().should.equal(25);
        dates[2].getMonth().should.equal(1);
      });

      it('Fourth date should have 1h and 0m', function() {
        dates[3].getDate().should.equal(8);
        dates[3].getMonth().should.equal(2);
      });

      it('Fifth date should have 1h and 20m', function() {
        dates[4].getDate().should.equal(20);
        dates[4].getMonth().should.equal(2);
      });

      it('Sixth date should have 1h and 40m', function() {
        dates[5].getDate().should.equal(1);
        dates[5].getMonth().should.equal(3);
      });
    });
  });
});
