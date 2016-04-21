import scheduler from '../../index'

import chai from 'chai'

chai.should();


describe('Every 20 seconds starting at ' +
  new Date(2000, 1, 1, 0, 0, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .EverySecond(20);

      d = new Date(2000, 1, 1, 0, 0, 0, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should be equal to start', function() {
      dates[0].getTime().should.equal(d.getTime());
    });

    it('Second date should have 0m and 20s', function() {
      dates[1].getSeconds().should.equal(20);
      dates[1].getMinutes().should.equal(0);
    });

    it('Third date should have 0m and 40s', function() {
      dates[2].getSeconds().should.equal(40);
      dates[2].getMinutes().should.equal(0);
    });

    it('Fourth date should have 1m and 0s', function() {
      dates[3].getSeconds().should.equal(0);
      dates[3].getMinutes().should.equal(1);
    });

    it('Fifth date should have 1m and 20s', function() {
      dates[4].getSeconds().should.equal(20);
      dates[4].getMinutes().should.equal(1);
    });

    it('Sixth date should have 1m and 40s', function() {
      dates[5].getSeconds().should.equal(40);
      dates[5].getMinutes().should.equal(1);
    });
  });

describe('On every 20th second in each minute starting at ' +
  new Date(2000, 1, 1, 0, 0, 30, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .OnSecond(20);

      d = new Date(2000, 1, 1, 0, 0, 30, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should have 1m and 20s', function() {
      dates[0].getSeconds().should.equal(20);
      dates[0].getMinutes().should.equal(1);
    });

    it('Second date should have 2m and 20s', function() {
      dates[1].getSeconds().should.equal(20);
      dates[1].getMinutes().should.equal(2);
    });

    it('Third date should have 3m and 20s', function() {
      dates[2].getSeconds().should.equal(20);
      dates[2].getMinutes().should.equal(3);
    });

    it('Fourth date should have 4m and 20s', function() {
      dates[3].getSeconds().should.equal(20);
      dates[3].getMinutes().should.equal(4);
    });

    it('Fifth date should have 5m and 20s', function() {
      dates[4].getSeconds().should.equal(20);
      dates[4].getMinutes().should.equal(5);
    });

    it('Sixth date should have 6m and 20s', function() {
      dates[5].getSeconds().should.equal(20);
      dates[5].getMinutes().should.equal(6);
    });
  });
