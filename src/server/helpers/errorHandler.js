import status from './http/status';

const DEFAULT_MESSAGE = 'Internal Server Error';
const DEFAULT_STATUS_CODE = status.INTERNAL_SERVER_ERROR;

function handler(res, error) {
    if (error.error) {
        error = error.error;
    }

    res.status(error.status || error.code || DEFAULT_STATUS_CODE).json({
        error: error && error.message || (error || DEFAULT_MESSAGE).toString()
    });
}

export default handler;
