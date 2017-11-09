'use strict';

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
        return res.status(400).json({
            error: 'SEARCH query parameter is required'
        });
    }

    itemsProvider
        .getItems(req.query.search)
        .then(result => {
            result.author = req.author;
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({
                error: error && error.message || (error || 'Internal Server Error').toString()
            });
        });
};
