Milo.type({
    defaultOptions: Milo.inject('defaultCollectionOptions'),

    constructor: function Collection (options) {
    }
});

Milo.collection = function(type, options) {
    return Milo.fieldFactory('Collection', type, options);
};