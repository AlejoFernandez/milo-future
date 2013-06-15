Milo.mixin('Validable', {
    validationClause: {},
    defaultValidationClauseOptions: Milo.inject(),

    validations: function (clause, options) {
        if ((options && options.merge) || this.defaultValidationClauseOptions.merge) {
            Milo.extend(this.validationClause, clause);
        } else {
            this.validationClause = clause;
        }

        return this;
    }
});