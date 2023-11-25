const expressAsyncHandler = require("express-async-handler");

function productController(){

    const handleGettingCategories = expressAsyncHandler(async (req, res, next) => {
        res.json("category getting");
    })

    return {
        handleGettingCategories
    };

}


module.exports = productController;
