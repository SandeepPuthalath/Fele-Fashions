const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
        unique: true
    },
},{
    timestamps: true
})


const Category = mongoose.model("Category", schema);

module.exports = Category