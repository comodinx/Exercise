import _ from 'lodash';
import P from 'bluebird';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import config from '../../config';
import routes from '../../../shared/routes';
import App from '../../../shared/app';

const DEFAULT_API_OPTIONS = {
    baseUrl: config.getBaseURL()
};

let router = new express.Router();

function getHTML(markup, context) {
    const helmet = Helmet.renderStatic();

    return `
        <!DOCTYPE html>
        <html ${helmet.htmlAttributes.toString()}>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

                <link rel="shortcut icon" href="/favicon.ico" />
                <link type="text/css" rel="stylesheet" href="/assets/css/styles.css" />

                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}

                <script src="/assets/js/bundle.js" defer></script>
                <script>window.__initialData__ = ${serialize(context.initialData)};</script>
            </head>
            <body ${helmet.bodyAttributes.toString()}>
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

function getContext(data, seo) {
    return {
        api: DEFAULT_API_OPTIONS,
        initialData: data,
        seo
    };
}

function handler(req, res, next) {
    const activeRoute = routes.find(route => matchPath(req.path, route));
    const args = getArgs(req, activeRoute.component);

    P.bind(this)
    .then(() => P.resolve(activeRoute.component.fetchInitialData && activeRoute.component.fetchInitialData(args, DEFAULT_API_OPTIONS)))
    .catch(error => {
        return {
            error
        };
    })
    .then(data => {
        return new P(resolve => {
            return P.resolve(activeRoute.component.prepareSeo && activeRoute.component.prepareSeo(data, args))
                .then(seo => resolve(getContext(data, seo)))
                .catch(() => resolve(getContext(data)));
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

        res.send(getHTML(markup, context));
    })
    .catch(next);
}

_.each(routes, route => router.get(route.path || '*', handler));

export default router;
