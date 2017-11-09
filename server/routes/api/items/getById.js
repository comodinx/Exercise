'use strict';

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
        return res.status(400).json({
            error: 'ID parameter is required'
        });
    }

    itemsProvider
        .getItem(req.params.id)
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
