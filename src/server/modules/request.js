import _ from 'underscore';
import R from 'request-promise';
import config from '../config';

R.debug = config.get('request:debug');

const DEFAULT_BASE_URL = config.get('request:baseUrl');
const DEFAULT_TIMEOUT = config.get('request:timeout');

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
        options = _.defaults(options || {}, {
            method
        });

        return this.r(options);
    }
}

export default new Request();
