const router = require('express').Router()
const productController = require('../../controller/productController')

router.get('/',productController.getAllProduct)
router.post('/',productController.createProduct)

module.exports = router

