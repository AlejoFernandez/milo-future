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

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this === null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

if (!Array.prototype.contains) {
    Array.prototype.contains = function (value) {
        return this.indexOf(value) > -1;
    };
}

if (!Array.isArray) {
    Array.isArray = function (value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (value) {
        return this.indexOf(value) === 0;
    };
}

if (!String.prototype.camelize) {
    String.prototype.camelize = function () {
        return this.toString().replace(/(?:^|[\-_])(\w)/g, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
    };
}

if (!String.prototype.capitalize) {
    String.prototype.capitalize = function() {
        return this.toString().replace(/\b[a-z]/g, function (w) {
            return w.toUpperCase();
        });
    };
}

Milo.set = function (target, property, value) {
    target[property] = value;
};

Milo.get = function (target, property) {
    return target[property];
};

Milo.setProperties = function (target, properties) {
    for (var elem in properties) {
        Milo.assert('Cannot initialize the property ' + elem + ' with a function', !Milo.isFunction(properties[elem]));
        Milo.set(target, elem, properties[elem]);
    }
};

Milo.getProperties = function (source, properties) {
    var result = {}, value;
    
    for (var elem in source) {
        value = Milo.get(source, elem);

        if (!Milo.isUndefined(value) && !Milo.isFunction(value) && !elem.startsWith('_') && (!properties || properties.contains(elem))) {
            result[elem] = Milo.get(source, elem);
        }
    }

    return result;
};

Milo.clone = function (source) {
    if (!source) {
        return source;
    }

    if (source.clone) {
        return source.clone();
    } else {
        return JSON.parse(JSON.stringify(source));        
    }
};

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

Milo.fieldFactory = function (fieldType, type, options) {
    Milo.assert('The fieldType parameter should be a string', Milo.isString(fieldType));
    Milo.assert('The type parameter should be a string', Milo.isString(type));

    options = Milo.clone(options || {});
    options.type = type;

    return Milo.simpleFactory(fieldType, options, context);
};