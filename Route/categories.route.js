let express = require('express');
let categoriesRoute = express.Router();
let categoryController = require('./../Controller/category.controller');

categoriesRoute.get('/', categoryController.getAllCategories);
categoriesRoute.get('/:id', categoryController.getCategoryById);
categoriesRoute.post('/', categoryController.insertCategories);
categoriesRoute.post('/category', categoryController.insertCategory);
categoriesRoute.put('/', categoryController.updateCategories);
categoriesRoute.delete('/:id', categoryController.deleteCategories);

module.exports = categoriesRoute;
