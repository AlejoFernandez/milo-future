Milo.type({
    defaultOptions: Milo.inject('defaultLinkedCollectionOptions'),
    name: null,

    constructor: function LinkedCollection (options) {
        this.type = options.type;
        this.options = options;
    },

    setName: function (name) {
        this.name = name;
    },

    setupRecord: function (record) {
        var model = record._model,
            options = {};
            
        Milo.assert('The record does not have a model', !Milo.isUndefined(model));

        type = model[this.type] || model.context[this.type] || model.module[this.type];

        Milo.assert('The type ' + this.type + ' does not exist', !Milo.isUndefined(type));

        options.model = type;
        options.parent = record;

        record[this.name] = Milo.simpleFactory('Finder', options);
    }
});

Milo.linkedCollection = function(type, options) {
    return Milo.fieldFactory('LinkedCollection', type, options);
};