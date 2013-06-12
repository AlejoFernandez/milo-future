Milo.type('Queryable', 'ModelFactory', {
    context: Milo.inject(),
    module: Milo.inject(),

    constructor: function Model (options) {
        if (options) {
            this.test = options.test;
        }
    },
    doSomething: function () {
        console.log('Doing something');
    },
    isTest: function () {
        return this.test;
    }
});