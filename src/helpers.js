/**
 * Copyright (c) Mozilla Foundation http://www.mozilla.org/
 * This code is available under the terms of the MIT License
 */
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }

        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                fun.call(thisp, this[i], i, this);
            }
        }
    };
}

if (!Array.isArray) {
    Array.isArray = function (value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    };
}

Milo.isUndefined = function (value) {
    return 'undefined' === typeof value;
};

Milo.assert = function (desc, test) {
    if (!test) throw new Error("assertion failed: " + desc);
};

Milo.isString = function (param) {
    return 'string' === typeof param;
};

Milo.isObject = function (param) {
    return 'object' === typeof param;
};

Milo.isFunction = function (param) {
    return 'function' === typeof param;
};