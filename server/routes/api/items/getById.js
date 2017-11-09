'use strict';

const http = require('orcorum').http;
const itemsProvider = require('../../../providers/items');

/**
 * Endpoint /api/items/:id
 * Method GET
 * URL parameters
 *  · id (*) String. Item unique identifier (ID)
 *
 * Response
 *  · Success:
 *      HTTP/1.1 200 OK
 *      {
 *          "author": {
 *              "name": String,
 *              "lastname": String
 *          },
 *          "item": {
 *              "id": String,
 *              "title": String,
 *              "price": {
 *                  "currency": String,
 *                  "amount": Number,
 *                  "decimals": Number
 *              },
 *              “picture”: String,
 *              "condition": String,
 *              "free_shipping": Boolean,
 *              "sold_quantity": Number,
 *              "description": String
 *          }
 *      }
 *
 *  · Failure:
 *      HTTP/1.1 4XX / 5XX ERROR
 *      {
 *          "error": String
 *      }
 */
module.exports = (req, res) => {
    if (!req.params || !req.params.id) {
        return res.status(http.status.BAD_REQUEST).json({
            error: 'ID parameter is required'
        });
    }

    return itemsProvider
        .getItem(req.params.id)
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
