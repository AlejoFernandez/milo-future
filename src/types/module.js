Milo.module = function (name, options) {
    return Milo.factory(this.modules, 'Module', name, options);
};

Milo.type('ModelFactory', {
    constructor: function Module (options) {
        this.module = this;
    }
});