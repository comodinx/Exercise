'use strict';

const os = require('os');
const moment = require('moment');

const R_N = /\r?\n|\r/g;
const PID = process.pid;
const HOSTNAME = os.hostname();

process.on('uncaughtException', process.env.NODE_ENV === 'production' ? handleProduction : handleDevelopment);

function handleProduction(error)
{
    let message = error.stack.replace(R_N, '');
    let now = moment().format('MMM DD HH:mm:ss');

    console.log(`${now} ${HOSTNAME}[${PID}}]: [ERROR] ${message}`);
    process.exit(1);
}

function handleDevelopment(error)
{
    throw error;
}
