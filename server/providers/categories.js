'use strict';

const P = require('bluebird');
const e = require('../helpers/e');
const request = require('../modules/request');

const cache = {};

class Categories {
    getCategories(id) {
        return P.bind(this)
            .then(() => {
                // Verify if category is in cache
                if (cache[id]) {
                    return cache[id];
                }

                // Find category on API
                return request
                    .get(`/categories/${id}`)
                    .then(body => {
                        if (!body || body.error || !body.path_from_root) {
                            throw new e.CancellationException();
                        }
                        return body.path_from_root;
                    })
                    .then(categories => {
                        cache[id] = categories;
                        return cache[id];
                    });
            });
    }
}

module.exports = new Categories();
