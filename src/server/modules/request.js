import _ from 'lodash';
import R from 'request-promise';
import config from '../config';

R.debug = config.get('request.debug');

const DEFAULT_BASE_URL = config.get('request.baseUrl');
const DEFAULT_TIMEOUT = config.get('request.timeout');

class Request {
    constructor() {
        this.r = R.defaults({
            json: true,
            baseUrl: DEFAULT_BASE_URL,
            timeout: DEFAULT_TIMEOUT
        });
    }

    get(options) {
        return this.request('get', options);
    }

    post(options) {
        return this.request('post', options);
    }

    request(method, options) {
        if (_.isString(options)) {
            options = {
                uri: options
            };
        }

        return this.r(_.defaults(options || {}, {
            method
        }));
    }
}

export default new Request();
