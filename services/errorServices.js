const Error = require('./../models/errors');



const log_error = (args) => {
    return Error.create(args);
}

module.exports = {
    log_error: log_error
}