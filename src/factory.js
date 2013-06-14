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

Milo.inject = function (injectable) {
    return '@inject' + (injectable ? ':' + injectable : '');
};

Milo.type = function () {
    var params, mixins, type, constructor, typeMembers = {};

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
    Milo.extend(typeMembers, type);

    Milo.extend(constructor.prototype, type);
    Milo.types[constructor.name] = constructor;
};

Milo.cacheDependencies = function (type, target) {
    var dependencies = [],
        property, element, injectable;

    for (var prop in target) {
        property = target[prop];
        element = prop;

        if (Milo.isString(property) && property.startsWith('@inject')) {
            injectable = property.split(':')[1] || element;
            dependencies.push({ element: element, injectable: injectable });
        }
    }

    type.$dependencies = dependencies;

    return dependencies;
};

Milo.injectDependencies = function (context, type, target) {
    var dependencies = type.$dependencies,
        emptyContext = {};

    context = context || emptyContext;

    if (!dependencies) {
        dependencies = Milo.cacheDependencies(type, target);
    }

    dependencies.forEach(function (dep) {
        var element = dep.element, injectable = dep.injectable,
            instance;

        instance = (injectable === 'context' ? context : null) || context[injectable] ||
            Milo.options[injectable] || Milo.mixins[injectable] ||
            Milo.modules[injectable] || Milo[injectable];

        Milo.assert('Cannot inject ' + injectable + ' into ' + type.name + '.' + element, instance);

        target[element] = instance;
    });
};

Milo.factory = function () {
    var typeName, key, options, obj, context, params;

    Milo.assert('The factory method should receive at least three arguments', arguments.length > 2);
    Milo.assert('The context should be an object', Milo.isObject(arguments[0]));
    Milo.assert('The prototype name should be a string', Milo.isString(arguments[1]));
    Milo.assert('The object identifier should be a string', Milo.isString(arguments[2]));

    params = [].slice.apply(arguments);
    context = params.shift();

    typeName = params.shift();
    key = params.shift();
    obj = context[key];

    if (!obj) {
        obj = Milo.simpleFactory(typeName, params, context);
        context[key] = obj;
    }

    return obj;
};

Milo.simpleFactory = function (typeName, params, context) {
    var obj, type;

    type = Milo.types[typeName];
    params = params || [];

    Milo.assert('The type ' + typeName + ' does not exist', !Milo.isUndefined(type));
    Milo.assert('The type ' + typeName + ' is not a function', Milo.isFunction(type));

    obj = new type(params.length === 1 ? params[0] : params);
    Milo.injectDependencies(context, type, obj);

    return obj;
};