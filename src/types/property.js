Milo.type({
    defaultOptions: Milo.inject('defaultPropertyOptions'),

    constructor: function Property (options) {
        this.options = options || this.defaultOptions;
    }
});

Milo.property = function(type, options) {
    return Milo.fieldFactory('Property', type, options);
};