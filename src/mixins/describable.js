Milo.mixin('Describable', {
    resourceDescription: {},
    resourceDescriptionDefaultOptions: Milo.inject(),

    describe: function (description, options) {
        if ((options && options.merge) || this.resourceDescriptionDefaultOptions.merge) {
            Milo.extend(this.resourceDescription, description);
        } else {
            this.resourceDescription = description;
        }

        return this;
    }
});