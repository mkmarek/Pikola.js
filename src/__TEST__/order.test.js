import scheduler from '../../index'
import {dateToStr} from './templates.test'
import chai from 'chai'

chai.should();

describe('It shouldn\'t matter in which order you specify different layers' , function() {
    let dates, length = 40;
    const start = new Date(2000, 1, 1, 0, 0, 0, 0)

    const trigger1 = scheduler()
    .EveryMonth(4)
    .OnWeek(1)
    .OnDayOfWeek(4)
    .EveryHour(4)
    .OnSecond(12)
    .OnMinute(21)
    .EveryMillisecond(333)

    const expectedDates = trigger1.GetExecutionDatesAfter(start, length);

    before(function() {

      const trigger2 = scheduler()
      .EveryMillisecond(333)
      .OnSecond(12)
      .OnWeek(1)
      .EveryMonth(4)
      .EveryHour(4)
      .OnDayOfWeek(4)
      .OnMinute(21)

      dates = trigger2.GetExecutionDatesAfter(start, length);
    });

    it(`Should return a set of ${length} dates`, function() {
      dates.length.should.equal(length);
    });

    expectedDates.forEach((expected, i) =>
      it(`Date no.${i+1}  should be equal to ${dateToStr(expected)}`, function() {
        dateToStr(dates[i]).should.equal(dateToStr(expected))
      })
    );
  });
