import os from 'os';

export default {
    enabled: false,
    workers: os.cpus().length
};
