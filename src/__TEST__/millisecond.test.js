import scheduler from '../../index'

import chai from 'chai'

chai.should();

describe('Every 250 milliseconds starting from ' +
  new Date(2000, 1, 1, 0, 0, 0, 1),
  function() {

    let trigger, dates, d;

    before(function() {

      trigger = scheduler()
        .EveryMillisecond(250);

      d = new Date(2000, 1, 1, 0, 0, 0, 1);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should b equal to the start', function() {
      dates[0].getTime().should.equal(d.getTime())
    });

    it('Second date should have 0s and 251ms', function() {
      dates[1].getMilliseconds().should.equal(251);
      dates[1].getSeconds().should.equal(0);
    });

    it('Third date should have 0s and 501ms', function() {
      dates[2].getMilliseconds().should.equal(501);
      dates[2].getSeconds().should.equal(0);
    });

    it('Fourth date should have 0s and 751ms', function() {
      dates[3].getMilliseconds().should.equal(751);
      dates[3].getSeconds().should.equal(0);
    });

    it('Fifth date should have 1s and 1ms', function() {
      dates[4].getMilliseconds().should.equal(1);
      dates[4].getSeconds().should.equal(1);
    });

    it('Fifth date should have 1s and 251ms', function() {
      dates[5].getMilliseconds().should.equal(251);
      dates[5].getSeconds().should.equal(1);
    });
  });

describe('On 250th millisecond of each second starting from ' +
  new Date(2000, 1, 1, 0, 0, 0, 300),
  function() {

    let trigger, dates, d;

    before(function() {

      trigger = scheduler()
        .OnMillisecond(250);

      d = new Date(2000, 1, 1, 0, 0, 0, 300);
      Object.freeze(d);

      dates = trigger.GetExecutionDatesAfter(d, 6);
    });

    it('Should return a set of 6 dates', function() {
      dates.length.should.equal(6);
    });

    it('First date should have 1s and 250ms', function() {
      dates[0].getMilliseconds().should.equal(250);
      dates[0].getSeconds().should.equal(1);
    });

    it('Second date should have 2s and 250ms', function() {
      dates[1].getMilliseconds().should.equal(250);
      dates[1].getSeconds().should.equal(2);
    });

    it('Third date should have 3s and 250ms', function() {
      dates[2].getMilliseconds().should.equal(250);
      dates[2].getSeconds().should.equal(3);
    });

    it('Fourth date should have 4s and 250ms', function() {
      dates[3].getMilliseconds().should.equal(250);
      dates[3].getSeconds().should.equal(4);
    });

    it('Fifth date should have 5s and 250ms', function() {
      dates[4].getMilliseconds().should.equal(250);
      dates[4].getSeconds().should.equal(5);
    });

    it('Fifth date should have 6s and 250ms', function() {
      dates[5].getMilliseconds().should.equal(250);
      dates[5].getSeconds().should.equal(6);
    });
  });
