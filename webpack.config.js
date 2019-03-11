'use strict';

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const MODE = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = MODE === 'production';
const devtool = IS_PRODUCTION ? false : 'cheap-module-source-map';

const clientConfig = {
    entry: [
        'es6-promise',
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
            exclude: /node_modules/,
            query: {
                presets: [
                    'react-app'
                ]
            }
        }]
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: {
        warnings: false
    },
    watch: false,
    plugins: [
        new webpack.BannerPlugin({
            banner: '__isBrowser__ = true;',
            raw: true,
            include: /\.js$/
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(MODE)
            }
        })
    ],
    optimization: {},
    mode: MODE,
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
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
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
    optimization: {},
    mode: MODE,
    devtool
};

if (IS_PRODUCTION) {
    const plugin = new TerserPlugin({
        parallel: true,
        terserOptions: {
            compress: true,
            warnings: false,
            output: {
                comments: false
            }
        }
    });

    clientConfig.optimization.minimizer = [plugin];
    serverConfig.optimization.minimizer = [plugin];
}

module.exports = [clientConfig, serverConfig];
