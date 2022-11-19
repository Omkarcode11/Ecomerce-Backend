let express = require('express');
let route = express.Router();
let categoriesRoute = require('./categories.route');
let productRoute = require('./products.route');

route.get('/', (req, res, next) => {
  res.write('your in Home Page');
  res.end();
});

//this is Category routes
route.use('/categories', categoriesRoute);

//This is Products routes
route.use('/products', productRoute);

module.exports = route;
