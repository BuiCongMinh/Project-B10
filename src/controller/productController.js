const productService = require('../services/productService')
module.exports = {
    getAllProduct: async (req, res) => {
        try {
            const data = productService.findAllProduct()
            res.json({
                message: 'đã truy cập thành công !',
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'server err',
                error

            })
        }
    },

    createProduct: async (req, res) => {
        try {
            if(!req.body){
                return res.status(401).json({
                    message: 'ko được để trống '
                })
            } 
            const data = await productService.createProduct(req.body)
            if(data)
            res.json({
                message: 'đã kết nối thành công !',
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'server err',
                error

            })
        }
    }
    
}