'use strict';

const moment = require('moment');
const morgan = require('morgan');
const config = require('../config');

const IS_ENABLED = config.get('morgan:enabled', true);
const OPTIONS = config.get('morgan:options', {});
const FORMAT = config.get('morgan:format', 'combined');

class Middleware {
    constructor() {
        morgan.token('date', () => {
            return moment().format('DD/MMM/YYYY:HH:mm:ss ZZ');
        });
        this.handler = morgan(FORMAT, OPTIONS);
    }

    get enabled() {
        return IS_ENABLED;
    }

    get weight() {
        return 1;
    }
}

module.exports = new Middleware();
