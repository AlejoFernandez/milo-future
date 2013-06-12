chai.should();
var expect = chai.expect;

describe('Core', function () {
    describe('initialization', function () {
        var context = {},
            myModel = Milo.factory(context, 'Model', 'myModel', { test: true });

        (1 === 1).should.be.equals(true);
    });
});