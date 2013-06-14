var Api;


Api = Milo.module('Api');

Api.resource('service')
    .uriTemplate('/services/:id')
    .describe({
        id: Milo.identifier('string'),
        name: Milo.property('string'),
        description: Milo.property('string'),
        versions: Milo.linkedCollection('version')
    })
    .validations({
        name: {
            required: true,
            maxLenght: 255
        }
    });

/// The resource factory also allows to send a json to describe the model
Api.resource('service', {
    id: Milo.identifier('string'),
    name: Milo.property('string'),
    description: Milo.property('string'),
    versions: Milo.linkedCollection('version')
});

/// You can access the resource either doing Api.service or Api.resource('service')
var service = Api.service;
var serviceAlso = Api.resource('service');

Api.resource('service')
    .resource('version')  // Or Api.service.resource('version')
        .describe({
            id: Milo.identifier('string'),
            major: Milo.property('string', { operations: ['POST'] }),
            minor: Milo.property('string'),
            revision: Milo.property('string'),
            description: Milo.property('string')
        })
        .serialization({  // Serialization hooks for the entire object
            beforeDeserialiation: function (raw, operation) {
                return raw;
            },
            afterSerialization: function (serialized, source, operation) {
                return serialized;
            }
        });


Api.resource('user')
    .describe({
        username: Milo.identifier('string'),
        name: Milo.property('string'),
        password: Milo.property('string')
    })
    .actions({
        activate: Milo.action('activate'),
        changePassword: Milo.action('changePassword')
    });

Api.resource('activate');

Api.resource('user').resource('changePassword')
    .describe({
        oldPassword: Milo.property('string'),
        newPassword: Milo.property('string')
    });

user.activate();
user.changePassword({ oldPassword: 'old', newPassword: 'new' });

Api.resource('environment')
    .describe({
        id: Milo.identifier('string'),
        name: Milo.property('string')
    );

Api.resource('consumer')
    .resource('version')
        .describe({
            id: Milo.identifier('string'),
            major: Milo.property('string', { operations: ['POST'] }),
            minor: Milo.property('string'),
            revision: Milo.property('string'),
            description: Milo.property('string'),
            environment: Milo.property('environment')
        })
        .validations({
            name: {
                required: true,
                maxLenght: 255
            }
        })
        .serialization({ // Serialization hooks for each property
            id: {
                beforeDeserialiation: function (raw, operation) {
                    return raw.major + '.' + raw.minor + '.' raw.revision;
                },
                afterSerialization: function (serialized, operation, source) {

                }
            },
            environment: {
                afterSerialization: function (serialized, operation, source) {
                    if (operation.method === 'post') {
                        serialized.id = source.id;
                    }

                    return serialized;
                }
            },
            beforeDeserialiation: function (raw, operation) {
                return raw;
            },
            afterSerialization: function (serialized, source, operation) {
                return serialized;
            }
        });


var service = Api.Service.where({ id: '1111' }).versions.where({ id: '1.1.1' }).endpoints.findMany();
