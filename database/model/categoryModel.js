const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    categoryId: {
        type: Number,
        require: true,
        unique: true
    },
    categoryName: {
        type: String,
        require: true,
        unique: true
    }
},{
    timestamps: true
})


const Category = mongoose.model("Category", schema);

module.exports = Category