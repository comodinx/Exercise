import _ from 'underscore';
// import { readdirSync, statSync } from 'fs';
// import path from 'path';

const DEFAULT_OPTIONS = {
    excludes: ['index'],
    extension: '.js'
};

function requiredirSync(dirname, options) {
    let files = {};

    options = _.defaults(options || {}, DEFAULT_OPTIONS);
/*
    readdirSync(dirname).forEach((filename) => {
        let abspath = dirname + '/' + filename;
        let name = path.basename(filename, options.extension);
        let extension = path.extname(filename);

        if (statSync(abspath).isDirectory()) {
            return files[filename] = requiredirSync(abspath);
        }
        if (_.contains(options.excludes, name) || extension !== options.extension) {
            return;
        }
        files[name] = require(abspath);
    });
*/
    return files;
}

export default {
    requiredirSync
};

