import os from 'os';
import moment from 'moment';

const R_N = /\r?\n|\r/g;
const PID = process.pid;
const HOSTNAME = os.hostname();

process.on('uncaughtException', process.env.NODE_ENV === 'production' ? handleProduction : handleDevelopment);

function handleProduction(error) {
    let message = error.stack.replace(R_N, '');
    let now = moment().format('MMM DD HH:mm:ss');

    console.log(`${now} ${HOSTNAME}[${PID}}]: [ERROR] ${message}`); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
}

function handleDevelopment(error) {
    throw error;
}
