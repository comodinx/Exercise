import _ from 'underscore';
import obj from '../helpers/object';
// import { requiredirSync } from '../helpers/fs';
import defaults from './environment/';
import production from './environment/production';

const SEPARATOR = ':';

// const ENVIRONMENT = requiredirSync(`${__dirname}/environment`);
const ENVIRONMENT = _.defaults({
    production
}, defaults);

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
        value = obj.get(ENVIRONMENT, [this.mode, ...keys]);

        if (value == null) {
            value = obj.get(ENVIRONMENT, keys, defaultValue);
        }
        return value;
    }

    getBaseURL() {
        let host = this.get('server:host');
        let port = this.get('server:port');
        let url = host;

        if (port != 80) {
            url = `${host}:${port}`;
        }
        return url;
    }
}

export default new Config();
