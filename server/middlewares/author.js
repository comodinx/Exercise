'use strict';

const config = require('../config');

const IS_ENABLED = config.get('author:enabled', true);
const NAME = config.get('author:name', 'Nicolas');
const LASTNAME = config.get('author:lastname', 'Molina');

class Middleware {
    get enabled() {
        return IS_ENABLED;
    }

    get weight() {
        return 2;
    }

    handler(req, res, next) {
        req.author = {
            name: NAME,
            lastname: LASTNAME
        };
        next();
    }
}

module.exports = new Middleware();
