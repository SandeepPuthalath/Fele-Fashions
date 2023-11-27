const expressAsyncHandler = require("express-async-handler");
const Category = require("../../database/model/categoryModel");
const httpStatus = require("../../config/httpStatus");
const AppError = require("../../utils/error/AppError");
const Product = require("../../database/model/productModel");

function productController() {

    const handleGetCategories = expressAsyncHandler(async (req, res) => {
        const query = req.query;
        const categories = await Category.find(query);
        res.status(httpStatus.OK).json({ totalCategories: categories.length, categories })
    })

    const handleGetProductsList = expressAsyncHandler(async(req, res) => {
        const query = req.query;
        const products = await Product.find(query);
        res.status(httpStatus.OK).json({totalProducts: products.length, products})
    })

    const handleAddCategory = expressAsyncHandler(async (req, res, next) => {
        const { categoryId, categoryName } = req.body
        const isCategoryExists = await Category.findOne({ categoryId, categoryName });
        if (isCategoryExists) {
            const err = new AppError("Category already exists", httpStatus.CONFLICT)
            return next(err);
        }
        const category = new Category({
            categoryId,
            categoryName,
        });
        category.save();
        res.status(httpStatus.SUCCESS).json({ message: "Category successfully added" });
    })

    const handleAddProduct = expressAsyncHandler(async (req, res, next) => {
        const { productId, productName, productImage, price, brand, categoryId } = req.body;
        const isProductExists = await Product.findOne({ productId, productName });
        if (isProductExists) {
            const err = new AppError("Product already exists", httpStatus.CONFLICT);
            return next(err)
        }
        const category = Category.findOne({ categoryId });
        if (!category) {
            const err = new AppError("This is not a valid category", httpStatus.NOT_FOUND);
            return next(err);
        }

        const product = new Product({
            productId,
            productName,
            productImage,
            price,
            brand,
            categoryId
        })
        product.save();

        res.status(httpStatus.SUCCESS).json({ message: "Product saved Success fully" })
    })

    return {
        handleGetCategories,
        handleGetProductsList,
        handleAddProduct,
        handleAddCategory,
    };

}


module.exports = productController;
