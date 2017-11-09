'use strict';

const _ = require('underscore');
const R = require('request-promise');
const config = require('../config');

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
            method: method
        });

        return this.r(options);
    }

}

module.exports = new Request();
