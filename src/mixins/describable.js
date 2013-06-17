Milo.mixin('Describable', {
    resourceDescription: {},
    defaultResourceDescriptionOptions: Milo.inject(),

    describe: function (description, options) {
        if ((options && options.merge) || this.defaultResourceDescriptionOptions.merge) {
            Milo.extend(this.resourceDescription, description);
        } else {
            this.resourceDescription = description;
        }

        this.setupPropertyNames();

        return this;
    },

    setupPropertyNames: function () {
        var description = this.resourceDescription,
            prop;

        for (var elem in description) {
            prop = description[elem];

            if (!prop) {
                break;
            }

            prop.setName(elem);
        }
    },

    getDefaults: function () {
        var result = {},
            description = this.resourceDescription,
            prop, defaultValue;

        for (var elem in description) {
            prop = description[elem];

            if (!prop) {
                break;
            }

            if (!prop.defaultValue) {
                result[elem] = null;
                break;                
            }

            result[elem] = prop.defaultValue();
        }

        return result;
    },

    setupRecord: function (record) {
        var description = this.resourceDescription,
            prop;

        for (var elem in description) {
            prop = description[elem];

            if (!prop) {
                break;
            }

            if (prop.setupRecord) {
                prop.setupRecord(record);                
            }
        }
    }
});