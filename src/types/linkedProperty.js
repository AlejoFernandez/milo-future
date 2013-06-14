Milo.type('Queryable', {
    defaultOptions: Milo.inject('defaultLinkedPropertyOptions'),

    constructor: function LinkedProperty (options) {
    }
});

Milo.linkedProperty = function(type, options) {
    return Milo.fieldFactory('LinkedProperty', type, options);
};