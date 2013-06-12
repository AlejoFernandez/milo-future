Milo.applyMixins = function (target, mixins) {
    mixins.forEach(function (mixin) {
        Milo.assert('Mixin ' + mixin + ' is not defined', Milo.mixins[mixin]);
        Milo.extend(target, Milo.mixins[mixin]);
    });
};

Milo.extend = function (destination, source) {
    for (var elem in source) {
        if (source.hasOwnProperty(elem)) {
            destination[elem] = source[elem];
        }
    }
    return destination;
};

Milo.mixin = function (name, mixin) {
    Milo.mixins[name] = mixin;
};

Milo.type = function () {
    var params, mixins, type, constructor;

    Milo.assert('The type method should receive at least one argument', arguments.length > 0);

    params = [].slice.apply(arguments);
    type = params.pop();
    constructor = type.constructor;

    Milo.assert('The type should have a constructor function', constructor);
    Milo.assert('The constructor function should have a name', constructor.name);

    if (params.length) {
        Milo.applyMixins(constructor.prototype, params);
    }

    delete type.constructor;
    Milo.extend(constructor.prototype, type);
    Milo.types[constructor.name] = constructor;
};

Milo.factory = function () {
    var type, key, options, obj, context, params;

    Milo.assert('The factory method should receive at least three arguments', arguments.length > 2);
    Milo.assert('The context should be an object', Milo.isObject(arguments[0]));
    Milo.assert('The prototype name should be a string', Milo.isString(arguments[1]));
    Milo.assert('The object identifier should be a string', Milo.isString(arguments[2]));

    params = [].slice.apply(arguments);
    context = params.shift();

    type = Milo.types[params.shift()];

    Milo.assert('The type ' + arguments[1] + ' does not exist', !Milo.isUndefined(type));
    Milo.assert('The type ' + arguments[1] + ' is not a function', Milo.isFunction(type));

    key = params.shift();
    obj = context[key];

    if (!obj) {
        obj = new type(params.length === 1 ? params[0] : params);
        context[key] = obj;
    }

    return obj;
};