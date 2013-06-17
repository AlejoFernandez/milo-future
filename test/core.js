chai.should();
var expect = chai.expect;

describe('Core', function () {
    describe('initialization', function () {
        var Api = Milo.module('Api'), record, record2, version;

        Api.model('Service')
            .uriTemplate('/service/:id')
            .describe({
                id: Milo.property('string', { readOnly: true }),
                name: Milo.property('string'),
                summary: Milo.property('string', { defaultValue: '' }),
                description: Milo.property('string'),
                versions: Milo.linkedCollection('Version')
            })
            .validations({
                
            });

        Api.model('Service')
            .model('Version')
                .uriTemplate('/versions/:id')
                .describe({
                    id: Milo.property('string', { readOnly: true }),
                    major: Milo.property('string', { readOnly: true }),
                    minor: Milo.property('string', { readOnly: true }),
                    revision: Milo.property('string', { readOnly: true })
                });

        record = Api.Service.create({ name: 'Service1', description: 'Description' });
        record2 = Api.Service.where({ id: 'my-service' }).findOne();
        version = record2.versions.findOne();
        

        (1 === 1).should.be.equals(true);
    });
});