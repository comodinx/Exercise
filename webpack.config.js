'use strict';

const webpack = require('webpack');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const devtool = IS_PRODUCTION ? false : 'cheap-module-source-map';

let plugins = [
    new webpack.BannerPlugin({
        banner: '__isBrowser__ = true;',
        raw: true,
        include: /\.js$/
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    })
];

if (IS_PRODUCTION) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const clientConfig = {
    entry: [
        'isomorphic-fetch',
        './src/client/index.js'
    ],
    output: {
        path: `${__dirname}/public/assets/js`,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            query: {
                presets: [
                    'react-app'
                ]
            }
        }]
    },
    stats: {
        warnings: false
    },
    watch: false,
    plugins,
    devtool
};

const serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            query: {
                presets: [
                    'react-app'
                ]
            }
        }]
    },
    stats: {
        warnings: false
    },
    watch: false,
    plugins: [
        new webpack.BannerPlugin({
            banner: "__isBrowser__ = false;",
            raw: true,
            include: /\.js$/
        })
    ],
    devtool
};

module.exports = [clientConfig, serverConfig];
