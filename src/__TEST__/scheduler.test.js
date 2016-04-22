import * as scheduler from '../scheduler'
import layers from '../resolution'

import chai from 'chai'

chai.should();


describe('scheduler', function() {
  describe('#create()', function() {

    let opt;

    before(function() {
      opt = scheduler.create();

      //freeze the object so it can't be changed
      Object.freeze(opt);
    });

    it('Should return options object', function() {
      opt = scheduler.create();
      opt.should.exist;
    });

    it('Should return options object with layers', function() {
      opt = scheduler.create();
      opt.layers.should.exist;
    });
  });

  describe('#addLayer()', function() {

    let initialOpt, opt;
    const layer = {
      resolution: layers.Millisecond,
      interval : 100
    };

    before(function() {
      initialOpt = scheduler.create();

      //freeze the object so it can't be changed
      Object.freeze(initialOpt);

      opt = scheduler.addLayer(layer, initialOpt);

      //freeze the object so it can't be changed
      Object.freeze(opt);
    });

    it('Should return options object', function() {
      opt.should.exist;
    });

    it('Should return options object with layers', function() {
      opt.layers.should.exist;
    });

    it('Should return options object with layers as an object where interval is 100', function() {
      opt.layers[layers.Millisecond].interval.should.be.equal(100);
    });

  });
});
