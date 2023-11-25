const verifyApiKey = require("../utils/middlewares/verifyApiKey");
const productRoutes = require("./product")

function routes(app){
    app.use("/api/product", verifyApiKey, productRoutes());
}

module.exports = routes