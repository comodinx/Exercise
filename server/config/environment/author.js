'use strict';

const _ = require('underscore');
const packageJson = require('../../../package.json');

module.exports = _.extend({
    enabled: true
}, packageJson);
