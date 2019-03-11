import _ from 'lodash';
import P from 'bluebird';
import e from '../helpers/e';
import status from '../helpers/http/status';
import request from '../modules/request';
import config from '../config';
import categoriesProvider from './categories';

const LIMIT_ON_LISTING = config.get('items.limitOnListing', 4);

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
                // We look for the category that most results obtained
                return this.getCategoryMostResultsObtained(items).then(categories => {
                    return [items, categories];
                });
            })
            .spread((items, categories) => {
                return {
                    items: this.parseItems(items),
                    categories
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
                    })
                    .catch(error => {
                        if (error.statusCode && error.statusCode === status.NOT_FOUND) {
                            return item;
                        }
                        throw error;
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

    getCategoryMostResultsObtained(items) {
        return P.bind(this)
            .then(() => {
                let counters = _.countBy(_.map(items, 'category_id'));
                let category = _.maxBy(_.keys(counters), category => counters[category]);

                if (!category) {
                    return [];
                }
                return categoriesProvider.getCategories(category);
            })
            .catch(() => {
                return [];
            });
    }

    parseItems(items) {
        return _.map(items, (item) => this.parseItem(item));
    }

    parseItem(res, hasDetailInformation) {
        let item = _.pick(res, ['id', 'title', 'description', 'price', 'condition', 'shipping', 'thumbnail', 'sold_quantity', 'pictures', 'address']);

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
        item.location = item.address && _.pick(item.address, ['city_name', 'state_name']);
        item.location = item.location && _.uniq(_.values(item.location)).join(', ');
        delete item.address;

        if (!hasDetailInformation) {
            delete item.sold_quantity;
            delete item.description;
        }
        return item;
    }
}

export default new Items();
