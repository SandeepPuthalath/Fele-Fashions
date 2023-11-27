const errorHandler = (err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    err.statusCode = err.statusCode || 500;
    
    err.status = err.status || 'error';
    if (err.statusCode === 404) {
        res.status(err.statusCode).json({ errors: err.status, errorMessage: err.message })
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
}

module.exports = errorHandler