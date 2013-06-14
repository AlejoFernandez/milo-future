Milo.mixin('Queryable', {
    whereClause: {},
    whereClauseDefaultOptions: Milo.inject('whereClauseDefaultOptions'), 

    where: function (clause, options) {
        if ((options && options.merge) || this.whereClauseDefaultOptions.merge) {
            Milo.extend(this.whereClause, clause);
        } else {
            this._whereClause = clause;
        }

        return this;
    }
});