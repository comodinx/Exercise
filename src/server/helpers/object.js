import _ from 'underscore';

const slice = Array.prototype.slice;

function get(target, keys, defaultValue) {
    let value;

    keys = keys || [];
    defaultValue = (typeof defaultValue === 'undefined') ? null : defaultValue;

    if (!_.isArray(keys)) {
        keys = [keys];
    }
    if (!keys.length) {
        return defaultValue;
    }

    keys.every((key, index) => {
        try {
            if (!index) {
                value = target[key];
            }
            else {
                value = value[key];
            }
        }
        catch (err) {
            value = null;
            return false;
        }
        return true;
    });
    if (typeof value === 'undefined' || value === null) {
        return defaultValue;
    }
    return value;
}

function set(target, keys, value) {
    let source = {};
    let obj = source;

    keys = keys || [];

    if (!_.isArray(keys)) {
        keys = [keys];
    }
    if (!keys.length) {
        return target;
    }

    keys.every((key, index) => {
        if (keys.length === (index + 1)) {
            obj[key] = value;
        }
        else {
            obj[key] = {};
            obj = obj[key];
        }
        return true;
    });
    return extend(target, source);
}

function extend(target /* *sources*/) {
    _.each(slice.call(arguments, 1), source => {
        if (source) {
            _.each(source, (value, key) => {
                if (isObject(value) && isObject(target[key])) {
                    return (target[key] = extend(_.clone(target[key]), value));
                }
                target[key] = value;
            });
        }
    });
    return target;
}

function isObject(obj) {
    return _.isObject(obj) && !_.isArray(obj);
}

export default {
    get,
    set,
    extend
};
