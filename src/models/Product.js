const mongoose = require('mongoose')
const mogoose_delete = require('mongoose-delete')
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    sale: {
        type: String,
        required:true
    },
    amount: String,
    category: String,
    description: String,
    image: String,
    unixTask: String,
    rate: String,
}, { collection: 'Product' })

ProductSchema.plugin(mogoose_delete)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
