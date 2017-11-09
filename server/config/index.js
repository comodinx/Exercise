'use strict';

const orcorum = require('orcorum');
const obj = orcorum.object;
const fs = orcorum.fs;

const SEPARATOR = ':';
const ENVIRONMENT = fs.requiredirSync(`${__dirname}/environment`);

class Config {
    constructor() {
        this.mode = process.env.NODE_ENV;
    }

    /**
     * Se accederá a los archivos de configuración con la siguiente prioridad:
     *
     * -> config/environment/NODE_ENV_VALUE/[keys]
     * -> config/environment/[keys]
     */
    get(keys, defaultValue) {
        let value;

        keys = typeof keys === 'string' ? keys.split(SEPARATOR) : keys || [];
        value = obj.get(ENVIRONMENT, [this.mode].concat(keys));

        if (value == null) {
            value = obj.get(ENVIRONMENT, keys, defaultValue);
        }
        return value;
    }
}

module.exports = new Config();
