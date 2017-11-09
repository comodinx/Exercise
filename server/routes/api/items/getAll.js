'use strict';

const http = require('orcorum').http;
const itemsProvider = require('../../../providers/items');

/**
 * Endpoint /api/items
 * Method GET
 * Query parameters
 *  · search (*) String. ¿Qué estás buscando?
 *
 * Response
 *  · Success:
 *      HTTP/1.1 200 OK
 *      {
 *          "author": {
 *              "name": String,
 *              "lastname": String
 *          },
 *          "categories": [String, String, ...],
 *          "items": [{
 *              "id": String,
 *              "title": String,
 *              "price": {
 *                  "currency": String,
 *                  "amount": Number,
 *                  "decimals": Number
 *              },
 *              “picture”: String,
 *              "condition": String,
 *              "free_shipping": Boolean
 *          },
 *          {...},
 *          {...},
 *          {...}]
 *      }
 *
 *  · Failure:
 *      HTTP/1.1 4XX / 5XX ERROR
 *      {
 *          "error": String
 *      }
 */
module.exports = (req, res) => {
    if (!req.query || !req.query.search || !req.query.search.trim()) {
        return res.status(http.status.BAD_REQUEST).json({
            error: 'SEARCH query parameter is required'
        });
    }

    return itemsProvider
        .getItems(req.query.search)
        .then(result => {
            result.author = req.author;
            res.status(http.status.OK).json(result);
        })
        .catch(error => {
            res.status(http.status.INTERNAL_SERVER_ERROR).json({
                error: error && error.message || (error || 'Internal Server Error').toString()
            });
        });
};
