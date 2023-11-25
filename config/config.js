const dotenv = require("dotenv");

dotenv.config();
const config = {
    PORT: process.env.PORT ?? 5000,
    X_API_KEY: process.env.X_API_KEY
}

module.exports = config