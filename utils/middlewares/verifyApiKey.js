const config = require("../../config/config");
const httpStatus = require("../../config/httpStatus");
const AppError = require("../error/AppError");


const verifyApiKey = (req, res, next) => {
    const key = req.headers["x-api-key"]
    if (key !== config.X_API_KEY) {
        const err = new AppError("Unauthorised", httpStatus.UNAUTHORIZED)
        next(err)
    } else {
        next()
    }
}

module.exports = verifyApiKey