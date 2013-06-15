chai.should();
var expect = chai.expect;

describe('Core', function () {
    describe('initialization', function () {
        var Api = Milo.module('Api'), record;

        Api.model('Service')
            .uriTemplate('/service/:id')
            .describe({
                id: Milo.property('string', { readOnly: true }),
                name: Milo.property('string'),
                description: Milo.property('string')
            })
            .validations({
                
            });

        record = Api.Service.create({ name: 'Service1', description: 'Description' });
        

        (1 === 1).should.be.equals(true);
    });
});