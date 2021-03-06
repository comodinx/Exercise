import P from 'bluebird';
import status from './http/status';

const TIMEOUT = 'ETIMEDOUT';

class Exception extends Error {
    constructor(message, name, code) {
        super();
        this.message = message || 'exception';
        this.name = name || 'Exception';
        this.code = code;
    }

    static is(error) {
        return is(Exception, error);
    }
}

class CancellationException extends P.CancellationError {
    constructor(message, name, code) {
        super();
        this.message = message || 'cancellation exception';
        this.name = name || CancellationException.name;
        this.code = code;
    }

    static get name() {
        return 'CancellationException';
    }

    static is(error) {
        return is(CancellationException, error);
    }
}

class ValidationException extends CancellationException {
    constructor(message, name, code) {
        super(message || 'validation exception', name || ValidationException.name, code || status.BAD_REQUEST);
    }

    static get name() {
        return 'ValidationException';
    }

    static is(error) {
        return is(ValidationException, error);
    }
}

class InternalServerException extends CancellationException {
    constructor(message, name, code) {
        super(message || 'internal server error', name || InternalServerException.name, code || status.INTERNAL_SERVER_ERROR);
    }

    static get name() {
        return 'InternalServerException';
    }

    static is(error) {
        return is(InternalServerException, error);
    }
}

class NotFoundException extends CancellationException {
    constructor(message, name, code) {
        super(message || 'not found', name || NotFoundException.name, code || status.NOT_FOUND);
    }

    static get name() {
        return 'NotFoundException';
    }

    static is(error) {
        return is(NotFoundException, error);
    }
}

class TimeoutException extends P.TimeoutError {
    constructor(message, name, code) {
        super();
        this.message = message || TimeoutException.message;
        this.name = name || TimeoutException.name;
        this.code = code || status.REQUEST_TIMEOUT;
    }

    static get message() {
        return 'timeout exception';
    }

    static get name() {
        return 'TimeoutException';
    }

    static is(error) {
        return is(TimeoutException, error);
    }
}

function toString(error) {
    try {
        return JSON.stringify(error);
    }
    catch (e) {
        return error.toString();
    }
}

function log(error, options) {
    let e = error instanceof Error ? error.stack : error;

    options = options || {};
    if (options.prefix) {
        e = `${options.prefix} ${e}`;
    }
    if (options.suffix) {
        e = `${e} ${options.suffix}`;
    }
    console.error(e); // eslint-disable-line no-console
}

function is(Exception, error) {
    return Exception.name === error.name;
}

export default {
    codes: {
        TIMEOUT
    },
    Exception,
    CancellationException,
    ValidationException,
    InternalServerException,
    NotFoundException,
    TimeoutException,
    toString,
    log
};
