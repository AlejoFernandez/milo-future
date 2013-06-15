Milo.type('Queryable', 'ModelFactory', 'Validable', 'Resource', 'Describable', {
    context: Milo.inject(),
    module: Milo.inject(),

    constructor: function Model (options) {
        if (options) {
        }
    },

    create: function (defaults) {
        var record = Milo.simpleFactory('Record', Milo.extend(this.getDefaults(), defaults));
        record.setModel(this);

        return record;
    }
});