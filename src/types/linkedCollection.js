Milo.type('Queryable', {
    defaultOptions: Milo.inject('defaultLinkedCollectionOptions'),

    constructor: function LinkedCollection (options) {
    }
});

Milo.linkedCollection = function(type, options) {
    return Milo.fieldFactory('LinkedCollection', type, options);
};