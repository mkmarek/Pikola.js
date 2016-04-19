import scheduler from '../../index'

import * as layers from '../recurrenceLayerTypes'
import * as types from '../recurrenceTypes'

import chai from 'chai'

chai.should();


describe('scheduler', function() {

  describe('#getExecutionDatesAfter()', function() {

    describe('(recurrence = Mixed && Type = Mixed)', function() {

      let trigger, dates;

      before(function() {
        trigger = scheduler()
        .EveryMonth(1) //every single month
        .OnDay(2) //on second day of that Month
        .OnHour(22) //at 22 hours
        .EveryMinute(20); //every 20 minutes in specified hour

        const d = new Date(2000, 1, 1, 0, 0, 0, 0);
        Object.freeze(d);

        dates = trigger.GetExecutionDatesAfter(d, 5);
      });

      it('Should return a set of 5 dates', function() {
        dates.length.should.equal(5);
      });

      it('First date should be on 2nd of Feb at 22:00', function() {
        dates[0].getDate().should.equal(2);
        dates[0].getHours().should.equal(22);
        dates[0].getMinutes().should.equal(0);
        dates[0].getMonth().should.equal(1);
      });

      it('Second date should be on 2nd of Feb at 22:20', function() {
        dates[1].getDate().should.equal(2);
        dates[1].getHours().should.equal(22);
        dates[1].getMinutes().should.equal(20);
        dates[1].getMonth().should.equal(1);
      });

      it('Third date should be on 2nd of Feb at 22:40', function() {
        dates[2].getDate().should.equal(2);
        dates[2].getHours().should.equal(22);
        dates[2].getMinutes().should.equal(40);
        dates[2].getMonth().should.equal(1);
      });

      it('Fourth date should be on 2nd of Mar at 22:00', function() {
        dates[3].getDate().should.equal(2);
        dates[3].getHours().should.equal(22);
        dates[3].getMinutes().should.equal(0);
        dates[3].getMonth().should.equal(2);
      });

      it('Fifth date should be on 2nd of Mar at 22:20', function() {
        dates[4].getDate().should.equal(2);
        dates[4].getHours().should.equal(22);
        dates[4].getMinutes().should.equal(20);
        dates[4].getMonth().should.equal(2);
      });
    });
  });
});
