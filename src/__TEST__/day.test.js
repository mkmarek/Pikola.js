import scheduler from '../../index'

import * as layers from '../recurrenceLayerTypes'
import * as types from '../recurrenceTypes'

import chai from 'chai'

chai.should();


describe('Every 12 days starting at ' +
  new Date(2000, 1, 1, 0, 0, 0, 0),
  function() {

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

    it('Second date should be on 13th of Feb', function() {
      dates[1].getDate().should.equal(13);
      dates[1].getMonth().should.equal(1);
    });

    it('Third date should be on 25th of Feb', function() {
      dates[2].getDate().should.equal(25);
      dates[2].getMonth().should.equal(1);
    });

    it('Fourth date should be on 8th of Mar', function() {
      dates[3].getDate().should.equal(8);
      dates[3].getMonth().should.equal(2);
    });

    it('Fifth date should be on 20th of Mar', function() {
      dates[4].getDate().should.equal(20);
      dates[4].getMonth().should.equal(2);
    });

    it('Sixth date should be on 1st of Apr', function() {
      dates[5].getDate().should.equal(1);
      dates[5].getMonth().should.equal(3);
    });
  });

describe('Every 12th day in each month starting at ' +
  new Date(2000, 1, 20, 0, 0, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .OnDay(12);

      d = new Date(2000, 1, 20, 0, 0, 0, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should be on 12th of Mar', function() {
      dates[0].getDate().should.equal(12);
      dates[0].getMonth().should.equal(2);
    });

    it('Second date should be on 12th of Apr', function() {
      dates[1].getDate().should.equal(12);
      dates[1].getMonth().should.equal(3);
    });

    it('Third date should be on 12th of May', function() {
      dates[2].getDate().should.equal(12);
      dates[2].getMonth().should.equal(4);
    });

    it('Fourth date should be on 12th of Jun', function() {
      dates[3].getDate().should.equal(12);
      dates[3].getMonth().should.equal(5);
    });

    it('Fifth date should be on 12th of Jul', function() {
      dates[4].getDate().should.equal(12);
      dates[4].getMonth().should.equal(6);
    });

    it('Sixth date should be on 12th of Aug', function() {
      dates[5].getDate().should.equal(12);
      dates[5].getMonth().should.equal(7);
    });
  });
