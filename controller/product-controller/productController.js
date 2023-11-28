const expressAsyncHandler = require("express-async-handler");
const Category = require("../../database/model/categoryModel");
const httpStatus = require("../../config/httpStatus");
const AppError = require("../../utils/error/AppError");
const Product = require("../../database/model/productModel");
const { generateId } = require("../../utils/common/uuidGenerator");

function productController() {

    const handleGetCategories = expressAsyncHandler(async (req, res) => {
        const query = req.query;
        const categories = await Category.find(query);
        res.status(httpStatus.OK).json({ totalCategories: categories.length, categories })
    })

    const handleGetProductsList = expressAsyncHandler(async(req, res, next) => {
        const query = req.query;
        const category = await Category.findById(query.categoryId);
        if(!category){
            const err = new AppError("The category dose not exists", httpStatus.NOT_FOUND)
            return next(err)
        }
        const products = await Product.find(query);
        if(!products.length){
            const err= new AppError("No Product Found", httpStatus.BAD_REQUEST)
            return next(err);
        }
        res.status(httpStatus.OK).json({categoryId: category?._id, categoryName: category?.categoryName, products})
    })

    const handleAddCategory = expressAsyncHandler(async (req, res, next) => {
        const { categoryName } = req.body
        const isCategoryExists = await Category.findOne({categoryName });
        if (isCategoryExists) {
            const err = new AppError("Category already exists", httpStatus.CONFLICT)
           return next(err) 
        }
        const category = new Category({
            categoryName,
        });
        category.save();
        res.status(httpStatus.SUCCESS).json({ message: "Category successfully added" });
    })

    const handleAddProduct = expressAsyncHandler(async (req, res, next) => {
        const { productName, productImage, price, brand, categoryName } = req.body;

        const category = await Category.findOneAndUpdate({categoryName},{}, {new: true, upsert: true});
        console.log(category);

         const product = await Product.create({
            productId: generateId(),
            productName,
            productImage,
            price,
            brand,
            categoryId: category._id
         })

         console.log(product)
       

        // const isProductExists = await Product.findOne({ productId, productName });
        // if (isProductExists) {
        //     const err = new AppError("Product already exists", httpStatus.CONFLICT);
        //     return next(err)
        // }
        // const category = Category.findOne({ categoryId });
        // if (!category) {
        //     const err = new AppError("This is not a valid category", httpStatus.NOT_FOUND);
        //     return next(err);
        // }

        // const product = new Product({
        //     productId,
        //     productName,
        //     productImage,
        //     price,
        //     brand,
        //     categoryId
        // })
        // product.save();

        res.status(httpStatus.SUCCESS).json({ message: "Product saved Successfully" })
    })

    return {
        handleGetCategories,
        handleGetProductsList,
        handleAddProduct,
        handleAddCategory,
    };

}


module.exports = productController;
