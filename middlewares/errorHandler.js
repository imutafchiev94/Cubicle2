function errorHandler(err, req, res, next) {
    console.log(err);
    console.log("This is from error handler");
}

module.exports = errorHandler;