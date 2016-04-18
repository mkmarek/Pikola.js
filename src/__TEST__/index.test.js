import {Add, Subtract, LambdaTest} from '../../index'
import chai from 'chai'

chai.should();

describe('Add', function() {
    describe('#calculate()', function () {
        it('Should return 2 for 1+1', function () {
            let a = new Add();

            a.calculate(1,1).should.equal(2);
        });
    });
});

describe('Subtract', function() {
    describe('#calculate()', function () {
        it('Should return 0 for 1-1', function () {
            let b = new Subtract();

            b.calculate(1,1).should.equal(0);
        });
    });
});


describe('LambdaTest', function() {
    describe('#calculate()', function () {
        it('Should return 0 for 1-1', function () {
            let c = new LambdaTest();

            var ret = c.mapAndFilter([1,2,3,4,5,6,7,8]);

            ret.length.should.equal(4);
            ret[0].should.equal(1);
            ret[1].should.equal(9);
            ret[2].should.equal(25);
            ret[3].should.equal(49);
        });
    });
});
