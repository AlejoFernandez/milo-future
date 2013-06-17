Milo.type('Queryable', {
    defaultOptions: Milo.inject('defaultLinkedPropertyOptions'),

    constructor: function LinkedProperty (options) {
    },

    setName: function (name) {
        this.name = name;
    }
});

Milo.linkedProperty = function(type, options) {
    return Milo.fieldFactory('LinkedProperty', type, options);
};