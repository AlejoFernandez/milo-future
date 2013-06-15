Milo.mixin('Queryable', {
    whereClause: {},
    defaultWhereClauseOptions: Milo.inject(),

    where: function (clause, options) {
        if ((options && options.merge) || this.defaultWhereClauseOptions.merge) {
            Milo.extend(this.whereClause, clause);
        } else {
            this.whereClause = clause;
        }

        return this;
    },

    findOne: function () {

    },

    findMany: function () {
        
    }
});