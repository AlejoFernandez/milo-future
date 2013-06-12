Milo.mixin('ModelFactory', {
    model: function (name, options) {
        return Milo.factory(this, 'Model', name, options);
    }
});

