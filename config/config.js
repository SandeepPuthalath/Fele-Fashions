const dotenv = require("dotenv");

dotenv.config();
const config = {
    PORT: process.env.PORT ?? 5000,
    X_API_KEY: process.env.X_API_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ,
    AWS_SECRET_KEY_ID: process.env.AWS_SECRET_KEY_ID,
    REGION: process.env.REGION,
    PRODUCT_TABLE: process.env.PRODUCT_TABLE,
    CATEGORY_TABLE: process.env.CATEGORY_TABLE,
    MONGODB_URI: process.env.MONGODB_URI
}

module.exports = config