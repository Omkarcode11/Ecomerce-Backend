let express = require('express');
let productRoute = express.Router();
let productController = require('./../Controller/product.controller');

productRoute.get('/', productController.getAllProducts);
productRoute.get('/:id', productController.getProductById);
productRoute.post('/product', productController.insertProduct);
productRoute.post('/', productController.insertProducts);
productRoute.put('/', productController.updateProduct);
productRoute.delete('/:id', productController.deleteProduct);

module.exports = productRoute;
