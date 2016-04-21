import scheduler from '../../index'

import chai from 'chai'

chai.should();


describe('Every 3 weeks starting at ' +
  new Date(2000, 1, 3, 0, 0, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .EveryWeek(3);

      d = new Date(2000, 1, 3, 0, 0, 0, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should start at 21st of Feb', function() {
      dates[0].getMonth().should.equal(1);
      dates[0].getDate().should.equal(21);
    });

    it('Second date should be on 13th of Mar', function() {
      dates[1].getMonth().should.equal(2);
      dates[1].getDate().should.equal(13);
    });

    it('Third date should be on 3rd of Apr', function() {
      dates[2].getMonth().should.equal(3);
      dates[2].getDate().should.equal(3);
    });

    it('Fourth date should be on 24th of Apr', function() {
      dates[3].getMonth().should.equal(3);
      dates[3].getDate().should.equal(24);
    });

    it('Fifth date should be on 15th of May', function() {
      dates[4].getMonth().should.equal(4);
      dates[4].getDate().should.equal(15);
    });

    it('Sixth date should be on 5th of Jun', function() {
      dates[5].getMonth().should.equal(5);
      dates[5].getDate().should.equal(5);
    });
  });

describe('On every 3rd week in each month starting at ' +
  new Date(2000, 1, 1, 11, 0, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .OnWeek(2);

      d = new Date(2000, 1, 1, 11, 0, 0, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should be on 14th of Feb', function() {
      dates[0].getMonth().should.equal(1);
      dates[0].getDate().should.equal(14);
    });

    it('Second date should be on 13th of Mar', function() {
      dates[1].getMonth().should.equal(2);
      dates[1].getDate().should.equal(13);
    });

    it('Third date should be on 10th of Apr', function() {
      dates[2].getMonth().should.equal(3);
      dates[2].getDate().should.equal(10);
    });

    it('Fourth date should be on 15th of May', function() {
      dates[3].getMonth().should.equal(4);
      dates[3].getDate().should.equal(15);
    });

    it('Fifth date should be on 12th of Jun', function() {
      dates[4].getMonth().should.equal(5);
      dates[4].getDate().should.equal(12);
    });

    it('Sixth date should be on 10th of July', function() {
      dates[5].getMonth().should.equal(6);
      dates[5].getDate().should.equal(10);
    });
  });
