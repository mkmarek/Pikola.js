import scheduler from '../src/index'
import chai from 'chai'

const should = chai.should();

describe('#OnMillisecond', function() {

  it('Should throw an error if interval higher than 999 is provided', function() {
    const foo = () => scheduler().OnMillisecond(1000)

    foo.should.throw(Error, /Interval in OnMillisecond can't be higher than 999/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnMillisecond(-1)

    foo.should.throw(Error, /Interval in OnMillisecond can't be lower than 0/)
  });

});

describe('#OnSecond', function() {

  it('Should throw an error if interval higher than 59 is provided', function() {
    const foo = () => scheduler().OnSecond(60)

    foo.should.throw(Error, /Interval in OnSecond can't be higher than 59/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnSecond(-1)

    foo.should.throw(Error, /Interval in OnSecond can't be lower than 0/)
  });

});

describe('#OnMinute', function() {

  it('Should throw an error if interval higher than 59 is provided', function() {
    const foo = () => scheduler().OnMinute(60)

    foo.should.throw(Error, /Interval in OnMinute can't be higher than 59/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnMinute(-1)

    foo.should.throw(Error, /Interval in OnMinute can't be lower than 0/)
  });

});

describe('#OnDayOfWeek', function() {

  it('Should throw an error if interval higher than 6 is provided', function() {
    const foo = () => scheduler().OnDayOfWeek(7)

    foo.should.throw(Error, /Interval in OnDayOfWeek can't be higher than 6/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnDayOfWeek(-1)

    foo.should.throw(Error, /Interval in OnDayOfWeek can't be lower than 0/)
  });

});

describe('#OnDayOfMonth', function() {

  it('Should throw an error if interval higher than 30 is provided', function() {
    const foo = () => scheduler().OnDayOfMonth(31)

    foo.should.throw(Error, /Interval in OnDayOfMonth can't be higher than 30/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnDayOfMonth(-1)

    foo.should.throw(Error, /Interval in OnDayOfMonth can't be lower than 0/)
  });

});

describe('#OnHour', function() {

  it('Should throw an error if interval higher than 23 is provided', function() {
    const foo = () => scheduler().OnHour(24)

    foo.should.throw(Error, /Interval in OnHour can't be higher than 23/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnHour(-1)

    foo.should.throw(Error, /Interval in OnHour can't be lower than 0/)
  });

});

describe('#OnWeek', function() {

  it('Should throw an error if interval higher than 4 is provided', function() {
    const foo = () => scheduler().OnWeek(5)

    foo.should.throw(Error, /Interval in OnWeek can't be higher than 4/)
  });

  it('Should throw an error if interval lower than zero is provided', function() {
    const foo = () => scheduler().OnWeek(-1)

    foo.should.throw(Error, /Interval in OnWeek can't be lower than 0/)
  });

});

describe('#EveryMillisecond', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EveryMillisecond(0)

    foo.should.throw(Error, /Interval in EveryMillisecond can't be lower than 1/)
  });

});

describe('#EverySecond', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EverySecond(0)

    foo.should.throw(Error, /Interval in EverySecond can't be lower than 1/)
  });

});

describe('#EveryMinute', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EveryMinute(0)

    foo.should.throw(Error, /Interval in EveryMinute can't be lower than 1/)
  });

});

describe('#EveryHour', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EveryHour(0)

    foo.should.throw(Error, /Interval in EveryHour can't be lower than 1/)
  });

});

describe('#EveryDay', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EveryDay(0)

    foo.should.throw(Error, /Interval in EveryDay can't be lower than 1/)
  });

});

describe('#EveryWeek', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EveryWeek(0)

    foo.should.throw(Error, /Interval in EveryWeek can't be lower than 1/)
  });

});

describe('#EveryMonth', function() {

  it('Should throw an error if interval lower than 1 is provided', function() {
    const foo = () => scheduler().EveryMonth(0)

    foo.should.throw(Error, /Interval in EveryMonth can't be lower than 1/)
  });

});
