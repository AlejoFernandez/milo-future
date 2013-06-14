chai.should();
var expect = chai.expect;

describe('Core', function () {
    describe('initialization', function () {
        var Api = Milo.module('Api');

        Api.model('service', { test: true });
        Milo.property('string', { defaultValue: '' });

        (1 === 1).should.be.equals(true);
    });
});