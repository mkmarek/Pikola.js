import scheduler from '../../index'

import chai from 'chai'

chai.should();


describe('Every 10 hours starting at ' +
  new Date(2000, 1, 1, 0, 0, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .EveryHour(10);

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

    it('Second date should have 1d and 10h', function() {
      dates[1].getHours().should.equal(10);
      dates[1].getDate().should.equal(1);
    });

    it('Third date should have 1d and 20h', function() {
      dates[2].getHours().should.equal(20);
      dates[2].getDate().should.equal(1);
    });

    it('Fourth date should have 2d and 6h', function() {
      dates[3].getHours().should.equal(6);
      dates[3].getDate().should.equal(2);
    });

    it('Fifth date should have 2d and 16hours', function() {
      dates[4].getHours().should.equal(16);
      dates[4].getDate().should.equal(2);
    });

    it('Sixth date should have 3d and 2h', function() {
      dates[5].getHours().should.equal(2);
      dates[5].getDate().should.equal(3);
    });
  });

describe('Every 10th hour in each day starting at ' +
  new Date(2000, 1, 1, 11, 0, 0, 0),
  function() {

    let trigger, dates, d;

    before(function() {
      trigger = scheduler()
        .OnHour(10);

      d = new Date(2000, 1, 1, 11, 0, 0, 0);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should have 2d and 10h', function() {
      dates[0].getHours().should.equal(10);
      dates[0].getDate().should.equal(2);
    });

    it('Second date should have 3d and 10h', function() {
      dates[1].getHours().should.equal(10);
      dates[1].getDate().should.equal(3);
    });

    it('Third date should have 4d and 10h', function() {
      dates[2].getHours().should.equal(10);
      dates[2].getDate().should.equal(4);
    });

    it('Fourth date should have 5d and 10h', function() {
      dates[3].getHours().should.equal(10);
      dates[3].getDate().should.equal(5);
    });

    it('Fifth date should have 6d and 10h', function() {
      dates[4].getHours().should.equal(10);
      dates[4].getDate().should.equal(6);
    });

    it('Sixth date should have 7d and 10h', function() {
      dates[5].getHours().should.equal(10);
      dates[5].getDate().should.equal(7);
    });
  });
