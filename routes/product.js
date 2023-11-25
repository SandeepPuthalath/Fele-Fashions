const express = require("express");
const productController = require("../controller/product-controller/productController");

function productRoutes() {

    const router = express.Router();
    const controller = productController();

    router.route("/categories").get(controller.handleGettingCategories)

    return router;
}

module.exports = productRoutes;