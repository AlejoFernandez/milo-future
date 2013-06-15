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
    },

    getDefaults: function () {
        var result = {},
            prop, defaultValue;

        for (var elem in this.resourceDescription) {
            prop = this.resourceDescription[elem];

            if (!prop) {
                break;
            }

            if (!Milo.isUndefined(prop.options.defaultValue)) {
                result[elem] = prop.options.defaultValue;
                break;
            }

            result[elem] = null;
        }

        return result;
    }
});