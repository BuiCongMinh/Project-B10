const Product = require('../models/Product')
module.exports = {
    findAllProduct: async () => {
        const data = await Product.find()
        return data
    },

    createProduct: async (body) => {
        const data = await Product.create(body)
    }
}

