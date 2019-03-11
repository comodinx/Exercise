import _ from 'lodash';
import defaults from './environment/';
import production from './environment/production';

const SEPARATOR = '.';

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

        keys = _.isString(keys) ? keys.split(SEPARATOR) : keys || [];
        value = _.get(ENVIRONMENT, [this.mode, ...keys].join(SEPARATOR));

        if (_.isUndefined(value)) {
            value = _.get(ENVIRONMENT, keys.join(SEPARATOR), defaultValue);
        }
        return value;
    }

    getBaseURL() {
        let host = this.get('server.host');
        let port = this.get('server.port');
        let url = host;

        if (port != 80) {
            url = `${host}:${port}`;
        }
        return url;
    }
}

export default new Config();
