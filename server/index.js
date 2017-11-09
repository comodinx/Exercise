'use strict';

require('./modules/uncaught');

// Imports
// ----------------------------------------------------
const _ = require('underscore');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cluster = require('./modules/cluster');
const middlewares = require('./middlewares');
const routes = require('./routes');
const config = require('./config');
const app = express();

// Constants
// ----------------------------------------------------
const MODE = app.get('env') || 'development';
const PORT = config.get('server:port', 3000);

// Configure
// ----------------------------------------------------
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(favicon(`${__dirname}/../public/favicon.ico`));
app.use(express.static('public'));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Cluters
// ----------------------------------------------------
(() => {
    if (cluster.enabled && !cluster.start()) {
        return;
    }
})();

// Middlewares
// ----------------------------------------------------
_.each(_.sortBy(middlewares, 'weight'), middleware => {
    if (!middleware.enabled) {
        return;
    }
    app.use(middleware.handler);
});

// Routes
// ----------------------------------------------------
app.use(routes);

// Go
// ----------------------------------------------------
app.listen(PORT, () => {
    console.log(`pid:${process.pid} listening on ${PORT} in ${MODE} mode`); // eslint-disable-line no-console
});
