Milo.type('Entity', {
    _model: null,
    constructor: function Record (defaults) {
        if (defaults) {
            this.setProperties(defaults);
        }
    },
    setModel: function (model) {
        this._model = model;
    }
});