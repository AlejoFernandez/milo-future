Milo.type({
    defaultOptions: Milo.inject('defaultCollectionOptions'),

    constructor: function Collection (options) {
    },

    setName: function (name) {
        this.name = name;
    }    
});

Milo.collection = function(type, options) {
    return Milo.fieldFactory('Collection', type, options);
};