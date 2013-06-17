Milo.type({
    defaultOptions: Milo.inject('defaultPropertyOptions'),

    constructor: function Property (options) {
        this.options = options || this.defaultOptions;
    },

    setName: function (name) {
        this.name = name;
    },

    defaultValue: function () {
        return Array.isArray(this.options.defaultValue) ? Milo.clone(this.options.defaultValue) : this.options.defaultValue;
    }
});

Milo.property = function(type, options) {
    return Milo.fieldFactory('Property', type, options);
};