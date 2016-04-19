import scheduler from '../../index'

import * as layers from '../recurrenceLayerTypes'

import chai from 'chai'

chai.should();


describe('scheduler', function() {

  describe('#getExecutionDatesAfter()', function() {

    describe('(recurrence = Millisecond && Type = Every)', function() {

      let trigger, dates, d;

      before(function() {

        trigger = scheduler()
        .EveryMillisecond(250);

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

      it('Second date should have 0s and 250ms', function() {
        dates[1].getMilliseconds().should.equal(250);
        dates[1].getSeconds().should.equal(0);
      });

      it('Third date should have 0s and 500ms', function() {
        dates[2].getMilliseconds().should.equal(500);
        dates[2].getSeconds().should.equal(0);
      });

      it('Fourth date should have 0s and 750ms', function() {
        dates[3].getMilliseconds().should.equal(750);
        dates[3].getSeconds().should.equal(0);
      });

      it('Fifth date should have 1s and 0ms', function() {
        dates[4].getMilliseconds().should.equal(0);
        dates[4].getSeconds().should.equal(1);
      });

      it('Fifth date should have 1s and 250ms', function() {
        dates[5].getMilliseconds().should.equal(250);
        dates[5].getSeconds().should.equal(1);
      });
    });
  });
});
