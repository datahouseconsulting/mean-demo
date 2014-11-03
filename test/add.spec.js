var should = require('should');
var Math = require('../app/services/math');

describe('ADD FUNCTION', function() { 

  it('should get 5 by adding 1 and 4', function () {
    var result = Math.add(1, 4);
    expect(result).toEqual(5);
  });

  it('should get 10 by adding 20 and -10', function(){
    var result = Math.add(20, -10);
    expect(result).toEqual(10);
  });

  it('should get -21 by adding -13 and -8', function(){
    var result = Math.add(-13, -8);
    expect(result).toEqual(-21);
  });

  it('should get 1 by adding 1 and 0'), function() {
    var result = Math.add(1, 0);
    expect(result).toEqual(1);
  };

});

describe('SUBTRACTION FUNCTION', function() { 

  it('should get 15 by subtracting 25 from 40', function () {
    var result = Math.sub(40, 25);
    expect(result).toEqual(15);
  });

  it('should get 10 by substracting -5 from 5', function(){
    var result = Math.sub(5, -5);
    expect(result).toEqual(10);
  });

  it('should get 6 by subtracting -13 from -7', function() {
    var result = Math.sub(-7, -13);
    expect(result).toEqual(6);
  });

  it('should get 1 by subtracting 0 from 1'), function() {
    var result = Math.sub(1, 0);
    expect(result).toEqual(1);
  };
});

