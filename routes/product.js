const express = require("express");
const productController = require("../controller/product-controller/productController");

function productRoutes() {

    const router = express.Router();
    const controller = productController();

    router.route("/list").get(controller.handleGetProductsList);

    router.route("/categories").get(controller.handleGetCategories).post(controller.handleAddCategory);

    router.route("/save").post(controller.handleAddProduct)

    return router;
}

module.exports = productRoutes;