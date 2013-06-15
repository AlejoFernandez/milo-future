Milo.mixin('Resource', {
    uri: '',
    identifier: '',
    name: '',

    uriTemplate: function (uri) {
        uri = uri || ('/' + this.name + '/:' + this.identifier);

        return this;
    }
});