import status from '../../../helpers/http/status';
import errorHandler from '../../../helpers/errorHandler';
import itemsProvider from '../../../providers/items';

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
export default (req, res) => {
    if (!req.query || !req.query.search || !req.query.search.trim()) {
        return res.status(status.BAD_REQUEST).json({
            error: 'SEARCH query parameter is required'
        });
    }

    return itemsProvider
        .getItems(req.query.search)
        .then(result => {
            result.author = req.author;
            res.status(status.OK).json(result);
        })
        .catch(errorHandler.bind(null, res));
};
