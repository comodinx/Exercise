'use strict';

const _ = require('underscore');
const e = require('../helpers/e');
const request = require('../modules/request');
const config = require('../config');

const categoriesProvider = require('./categories');
// const currenciesProvider = require('./currencies');

const LIMIT_ON_LISTING = config.get('items:limitOnListing', 4);

class Items {
    getItems(search) {
        return request
            .get(`/sites/MLA/search?q=${search}&limit=${LIMIT_ON_LISTING}`)
            .then(body => {
                if (!body || body.error) {
                    throw new e.CancellationException();
                }
                return body.results;
            })
            .then(items => {
                return {
                    items: this.parseItems(items)
                };
            });
    }

    getItem(id) {
        let url = `/items/${id}`;

        return request
            .get(url)
            .then(body => {
                if (!body || body.error) {
                    throw new e.CancellationException();
                }
                return body;
            })
            .then(item => {
                return request
                    .get(`${url}/description`)
                    .then(body => {
                        if (body || !body.error) {
                            item.description = body.plain_text || '';
                        }
                        return item;
                    });
            })
            .then(item => {
                return categoriesProvider
                    .getCategories(item.category_id)
                    .then(categories => {
                        return {
                            categories,
                            item
                        };
                    })
                    .catch(() => {
                        return {
                            categories: [],
                            item
                        };
                    });
            })
            .then(result => {
                result.item = this.parseItem(result.item, true);

                return result;
            });
    }

    parseItems(items) {
        return _.map(items, this.parseItem);
    }

    parseItem(res, hasDetailInformation) {
        let item = _.pick(res, 'id', 'title', 'description', 'price', 'condition', 'shipping', 'thumbnail', 'sold_quantity', 'pictures');

        // Prepare PICTURE
        item.picture = item.pictures && item.pictures.length && item.pictures[0].url || item.thumbnail;
        delete item.thumbnail;
        delete item.pictures;

        // Prepare PRICE
        item.price = {
            currency: '$',
            amount: Math.trunc(item.price),
            decimals: parseInt(item.price % 1, 10)
        };

        // Prepare SHIPPING
        item.free_shipping = item.shipping && item.shipping.free_shipping; // eslint-disable-line camelcase
        delete item.shipping;

        // Prepare LOCATION
        item.location = 'Capital Federal';

        if (!hasDetailInformation) {
            delete item.sold_quantity;
            delete item.description;
        }
        return item;
    }
}

module.exports = new Items();
