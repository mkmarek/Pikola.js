import {
  getFirstDayOfWeekInMonth,
  getIsoWeekFromDate,
  getDateOfISOWeek
} from '../utils'

import chai from 'chai'

const should = chai.should();


describe('Utils', function() {

  describe('#getFirstDayOfWeekInMonth', function() {

    const start = new Date(2016, 3, 1);

    it('should return first day of month when getting first day of first week', function() {
      const expected = new Date(2016, 3, 1);
      const d = getFirstDayOfWeekInMonth(start, 0);

      d.toString().should.equal(expected.toString());
    });

    it('should return monday when getting first day of first full week', function() {
      const expected = new Date(2016, 3, 4);
      const d = getFirstDayOfWeekInMonth(start, 1);

      d.toString().should.equal(expected.toString());
    });

    it('should return monday when getting first day of second full week', function() {
      const expected = new Date(2016, 3, 11);
      const d = getFirstDayOfWeekInMonth(start, 2);

      d.toString().should.equal(expected.toString());
    });

    it('should return monday when getting first day of third full week', function() {
      const expected = new Date(2016, 3, 18);
      const d = getFirstDayOfWeekInMonth(start, 3);

      d.toString().should.equal(expected.toString());
    });

    it('should return monday when getting first day of fourth full week', function() {
      const expected = new Date(2016, 3, 25);
      const d = getFirstDayOfWeekInMonth(start, 4);

      d.toString().should.equal(expected.toString());
    });

    it('should return null when getting first day of non existing week', function() {
      const d = getFirstDayOfWeekInMonth(start, 5);

      should.not.exist(d);
    });
  });

  describe('#getIsoWeekFromDate', function() {

    it('should return 1 for first full week of 2016', function() {
      const d = getIsoWeekFromDate(new Date(2016, 0, 4));

      d.should.equal(1);
    });

    it('should return 2 for second full week of 2016', function() {
      const d = getIsoWeekFromDate(new Date(2016, 0, 12));

      d.should.equal(2);
    });

    it('should return 5 for 4th of Feb 2000', function() {
      const d = getIsoWeekFromDate(new Date(2000, 1, 4));

      d.should.equal(5);
    });
  });

  describe('#getDateOfISOWeek', function() {
    it('should return 01/04/2016 for first full week of 2016', function() {

      const expected = new Date(2016, 0, 4);
      const d = getDateOfISOWeek(1, 2016);

      d.toString().should.equal(expected.toString());
    });

    it('should return 01/11/2016 for second full week of 2016', function() {

      const expected = new Date(2016, 0, 11);
      const d = getDateOfISOWeek(2, 2016);

      d.toString().should.equal(expected.toString());
    });

    it('should return 02/07/2016 for sixth week of 2000', function() {

      const expected = new Date(2000, 1, 7);
      const d = getDateOfISOWeek(6, 2000);

      d.toString().should.equal(expected.toString());
    });
  });
});
