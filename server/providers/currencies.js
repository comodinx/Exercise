'use strict';

const P = require('bluebird');
const e = require('../helpers/e');
const request = require('../modules/request');

const cache = {};

class Currencies {
    getCurrency(id) {
        return P.bind(this)
            .then(() => {
                // Verify if currency is in cache
                if (cache[id]) {
                    return cache[id];
                }

                // Find currency on API
                return request
                    .get(`/currencies/${id}`)
                    .then(body => {
                        if (!body || body.error) {
                            throw new e.CancellationException();
                        }
                        return body;
                    })
                    .then(currency => {
                        cache[id] = this.parseCurrency(currency);
                        return cache[id];
                    });
            });
    }

    parseCurrency(currency) {
        return currency.symbol;
    }
}

module.exports = new Currencies();
