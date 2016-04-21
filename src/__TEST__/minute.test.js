import scheduler from '../../index'

import chai from 'chai'

chai.should();


describe('Every 20 minutes starting at ' +
  new Date(2000, 1, 1, 0, 0, 0, 0),
  function() {

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

describe('Each 20th minute in each hour starting at ' +
  new Date(2000, 1, 1, 0, 21, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .OnMinute(20)

      d = new Date(2000, 1, 1, 0, 21, 0, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should have 1h and 20m', function() {
      dates[0].getMinutes().should.equal(20);
      dates[0].getHours().should.equal(1);
    });

    it('Second date should have 2h and 20m', function() {
      dates[1].getMinutes().should.equal(20);
      dates[1].getHours().should.equal(2);
    });

    it('Third date should have 3h and 20m', function() {
      dates[2].getMinutes().should.equal(20);
      dates[2].getHours().should.equal(3);
    });

    it('Fourth date should have 4h and 20m', function() {
      dates[3].getMinutes().should.equal(20);
      dates[3].getHours().should.equal(4);
    });

    it('Fifth date should have 5h and 20m', function() {
      dates[4].getMinutes().should.equal(20);
      dates[4].getHours().should.equal(5);
    });

    it('Sixth date should have 6h and 20m', function() {
      dates[5].getMinutes().should.equal(20);
      dates[5].getHours().should.equal(6);
    });
  });
