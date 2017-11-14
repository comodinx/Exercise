// Imports
// ----------------------------------------------------
import _ from 'underscore';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import middlewares from './middlewares';
import errorHandler from './modules/errorHandler';
import cluster from './modules/cluster';
import routes from './routes';
import config from './config';
import sourceMapSupport from 'source-map-support';

if (process.env.NODE_ENV !== 'production') {
    sourceMapSupport.install();
}

const app = express();

// Constants
// ----------------------------------------------------
const MODE = app.get('env') || 'development';
const PORT = config.get('server:port', 3000);

// Configure
// ----------------------------------------------------
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(favicon('public/favicon.ico'));
app.use(express.static('public'));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Cluters
// ----------------------------------------------------
if (!cluster.enabled || cluster.start()) {

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
    app.use(errorHandler.handler);

    // Go
    // ----------------------------------------------------
    app.listen(PORT, () => {
        console.log(`pid:${process.pid} listening on ${PORT} in ${MODE} mode`);
    });
}
