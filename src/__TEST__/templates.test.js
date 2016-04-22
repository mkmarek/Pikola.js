import chai from 'chai'

chai.should();

export function doubleFormat(no) {
  if (no <= 9)
    return '0' + no
  return no
}

export function dateToStr(date) {
  return doubleFormat(date.getDate()) +
    '.' +
    doubleFormat(date.getMonth() + 1) +
    '.' +
    (date.getFullYear()) +
    ' ' +
    doubleFormat(date.getHours()) +
    ':' +
    doubleFormat(date.getMinutes()) +
    ':' +
    doubleFormat(date.getSeconds()) +
    '.' +
    doubleFormat(date.getMilliseconds())
}

export function testCase({
  description,
  start,
  expectedDates,
  trigger
}) {
  describe(description + ' starting at ' + start.toString() ,
    function() {

      let dates, d;

      before(function() {
        dates = trigger.GetExecutionDatesAfter(start, expectedDates.length);
      });

      it(`Should return a set of ${expectedDates.length} dates`, function() {
        dates.length.should.equal(expectedDates.length);
      });

      expectedDates.forEach((expected, i) =>
        it(`Date no.${i+1}  should be equal to ${dateToStr(expected)}`, function() {
          dateToStr(dates[i]).should.equal(dateToStr(expected))
        })
      );
    });
}
