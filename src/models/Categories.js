const mongoose = require('mongoose')
const { Schema } = mongoose

const CategoriesSchema = new Schema({
    name: String,
},{collection:'Categories'})


const Categories = mongoose.model('Categories',CategoriesSchema)

module.exports = Categories
