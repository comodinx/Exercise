import os from 'os';

export default {
    enabled: true,
    workers: os.cpus().length
};
