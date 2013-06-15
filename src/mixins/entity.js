Milo.mixin('Entity', {
    set: function (property, value) {
        return Milo.set(this, property, value);
    },
    get: function (property) {
        return Milo.get(this, property);
    },
    setProperties: function (properties) {
        return Milo.setProperties(this, properties);
    },
    getProperties: function () {
        var params = [].slice.apply(arguments);

        return Milo.getProperties(this, params);
    }
});