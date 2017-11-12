import P from 'bluebird';
import _ from 'underscore';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
// import config from '../../config';
import routes from '../../../shared/routes';
import App from '../../../shared/app';

// const API_BASE_URL = config.getBaseURL();

let router = new express.Router();

function getBaseHTML(markup, context) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

                <link rel="shortcut icon" href="/favicon.ico">
                <link type="text/css" rel="stylesheet" href="/assets/css/styles.css">

                <title>Exercise</title>

                <script src="/assets/js/bundle.js" defer></script>
                <script>window.__initialData__ = ${serialize(context.initialData)};</script>
            </head>

            <body>
                <div id="root">${markup}</div>
            </body>
        </html>
    `;
}

function getArgs(req, component) {
    let args;

    if (component && component.prepareArgsForFetchInitialData) {
        args = component.prepareArgsForFetchInitialData({
            query: req.query,
            params: req.params
        });
    }
    return args;
}

function handler(req, res, next) {
    const activeRoute = routes.find(route => matchPath(req.url, route));
    const args = getArgs(req, activeRoute.component);

    P.resolve(activeRoute.component.fetchInitialData && activeRoute.component.fetchInitialData(args))
    .then(data => {
        return new P(resolve => {
            return P.resolve(activeRoute.component.prepareSeo && activeRoute.component.prepareSeo(data, args))
                .then(seo => resolve({
                    initialData: data,
                    seo
                }))
                .catch(() => resolve({
                    initialData: data
                }));
        });
    })
    .then(context => {
        const markup = renderToString(
            <StaticRouter location={req.url} context={context}>
                <App>
                    {context.seo &&
                        <Helmet {...context.seo} />
                    }
                </App>
            </StaticRouter>
        );

        res.send(getBaseHTML(markup, context));
    })
    .catch(next);
}

_.each(routes, route => router.get(route.path || '*', handler));

export default router;
