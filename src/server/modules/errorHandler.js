import status from '../helpers/http/status';

class ErrorHandler {
    constructor() {
        this.handler = this.handler.bind(this);
    }

    handler(error, req, res) {
        if (process.env.NODE_ENV === 'development') {
            console.error(error, error && error.stack || '');
        }
        res.status(status.MOVED_TEMPORARILY).redirect('/500');
    }
}

export default new ErrorHandler();
