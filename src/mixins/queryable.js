Milo.mixin('Queryable', {
    defaultWhereClauseOptions: Milo.inject(),

    where: function (clause, options) {
        if (!Milo.isObject(this.model)) {
            return Milo.simpleFactory('Finder', { model: this }).where(clause, options);
        }

        if ((options && options.merge) || this.defaultWhereClauseOptions.merge) {
            this.whereClause = this.whereClause || {};
            Milo.extend(this.whereClause, clause);
        } else {
            this.whereClause = clause;
        }

        return this;
    },

    findOne: function () {
        if (!Milo.isObject(this.model)) {
            return Milo.simpleFactory('Finder', { model: this }).findOne();
        }

        return this.model.create(Milo.clone(this.whereClause));
    },

    findMany: function () {
        if (!Milo.isObject(this.model)) {
            return Milo.simpleFactory('Finder', { model: this }).findMany();
        }

        return this.model.create(Milo.clone(this.whereClause));
    }
});