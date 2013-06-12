Milo.type('Queryable', {
    constructor: function Model (options) {
        this.test = options.test;
    },
    doSomething: function () {
        console.log('Doing something');
    },
    isTest: function () {
        return this.test;
    }
});