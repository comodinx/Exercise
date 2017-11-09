'use strict';

const os = require('os');

module.exports = {
    enabled: false,
    workers: os.cpus().length
};
