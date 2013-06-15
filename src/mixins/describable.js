Milo.mixin('Describable', {
    resourceDescription: {},
    defaultResourceDescriptionOptions: Milo.inject(),

    describe: function (description, options) {
        if ((options && options.merge) || this.defaultResourceDescriptionOptions.merge) {
            Milo.extend(this.resourceDescription, description);
        } else {
            this.resourceDescription = description;
        }

        return this;
    }
});