Milo.mixin('ModelFactory', {
    model: function (name, options) {
        var model = Milo.factory(this, 'Model', name, options);
        model.name = name;

        return model;
    }
});

