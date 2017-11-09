'use strict';

const _ = require('underscore');
const cluster = require('cluster');
const config = require('../config');

const COUNT = config.get('cluster:workers', 1);
const IS_ENABLED = config.get('cluster:enabled', false);

class Cluster {

    get enabled() {
        return IS_ENABLED;
    }

    start() {
        if (!cluster.isMaster) {
            return cluster.worker;
        }

        _.times(COUNT, () => {
            cluster.fork();
        });

        cluster.on('exit', (worker, code, signal) => {
            if (signal) {
                console.log(`id:${worker.id} pid:${process.pid} was killed by signal: ${signal}`);
            }
            else if (code === 0) {
                console.log(`id:${worker.id} pid:${process.pid} exiting`);
            }
            else {
                console.log(`id:${worker.id} pid:${process.pid} exiting with error code: ${code}`);
            }
            cluster.fork();
        });
        return null;
    }

};

module.exports = new Cluster();
