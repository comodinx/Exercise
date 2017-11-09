'use strict';

const _ = require('underscore');
const fs = require('orcorum').fs;

module.exports = _.mapObject(fs.requiredirSync(__dirname), middleware => {
    return middleware;
});
