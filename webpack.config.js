'use strict';

const webpack = require('webpack');

let plugins = [
    new webpack.DefinePlugin({
        'process.env': { 
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: [
        'whatwg-fetch',
        './src/index.jsx'
    ],
    output: {
        path: __dirname + '/public/assets/js',
        filename: 'bundle.js'
    },
    devtool: false,
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins
};
