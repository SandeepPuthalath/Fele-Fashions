const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number
    },
    productImage:{
        type: String
    },
    brand:{
        type: String
    },
    categoryId: {
        type: String,
    }
},
{
    timestamps: true
})

const Product = mongoose.model("Product", schema);

module.exports = Product