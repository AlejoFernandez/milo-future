Milo.mixin('Queryable', {
    whereClause: {},
    whereClauseDefaultOptions: Milo.inject(),

    where: function (clause, options) {
        if ((options && options.merge) || this.whereClauseDefaultOptions.merge) {
            Milo.extend(this.whereClause, clause);
        } else {
            this.whereClause = clause;
        }

        return this;
    }
});