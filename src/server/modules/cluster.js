import _ from 'lodash';
import cluster from 'cluster';
import config from '../config';

const COUNT = config.get('cluster.workers', 1);
const IS_ENABLED = config.get('cluster.enabled', false);

class Cluster {
    get enabled() {
        return IS_ENABLED;
    }

    start() {
        if (!cluster.isMaster) {
            return cluster.worker;
        }

        _.times(COUNT, () => cluster.fork());

        cluster.on('exit', (worker, code, signal) => {
            if (signal) {
                console.log(`id:${worker.id} pid:${process.pid} was killed by signal: ${signal}`); // eslint-disable-line no-console
            }
            else if (code === 0) {
                console.log(`id:${worker.id} pid:${process.pid} exiting`); // eslint-disable-line no-console
            }
            else {
                console.log(`id:${worker.id} pid:${process.pid} exiting with error code: ${code}`); // eslint-disable-line no-console
            }
            cluster.fork();
        });
        return null;
    }
}

export default new Cluster();
